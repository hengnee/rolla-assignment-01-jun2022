import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import {
  BaseProvider,
  EthersSigner,
  InjectEthersProvider,
  InjectSignerProvider,
  Wallet,
  formatEther,
  InjectContractProvider,
  EthersContract,
  parseEther,
} from 'nestjs-ethers';

import {CreateUserDto} from './dto/create-user.dto';
import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Users} from './user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectEthersProvider() private readonly provider: BaseProvider,
    @InjectSignerProvider() private readonly signer: EthersSigner,
    @InjectContractProvider() private readonly contract: EthersContract,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
  ) {}

  async registerNewAccount(user: CreateUserDto) {
    const existingUsername = await this.usersRepo.findOne({
      where: {username: user.username},
    });
    if (existingUsername) return `Username "${user.username}" already exists.`;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const privateKey = `0x${crypto.randomBytes(32).toString('hex')}`;
    const wallet: Wallet = this.signer.createWallet(privateKey); // possible to just use createRandomWallet here
    const address = await wallet.getAddress();

    const newUser = {
      address,
      privateKey,
      username: user.username,
      password: hashedPassword,
    };
    const createInstance = this.usersRepo.create(newUser);

    return this.usersRepo.save(createInstance);
  }

  /**
   * Having difficulty with the transfer logic..
   */
  async makeTransaction(user: CreateUserDto) {
    const userData = await this.usersRepo.findOne({
      where: {username: user.username},
    });

    const ERC20_ABI = [
      'function balanceOf(address) view returns (uint)',
      'function transfer(address, uint) returns (bool)',
    ];

    const contract = this.contract.create(address, ERC20_ABI);
    const erc20Contract = contract.getContract('ERC20', ERC20_ABI);

    const balance = await contract.balanceOf(address);
    const tx = contract.transfer(address, balance);
    await tx.wait();

    return;
  }

  async getAccountInfo(user: CreateUserDto) {
    const userData = await this.usersRepo.findOne({
      where: {username: user.username},
    });
    if (!userData) throw new NotFoundException();

    const canLogin = bcrypt.compareSync(user.password, userData.password);
    if (!canLogin) throw new UnauthorizedException();

    const balance = await this.provider.getBalance(userData.address);

    return {
      username: userData.username,
      address: userData.address,
      balance: formatEther(balance),
      tokens: userData.tokens,
    };
  }
}
