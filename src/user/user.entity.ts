import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

import {Exclude} from 'class-transformer';
import {Tokens} from '../token/token.entity';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({type: 'varchar', length: 30, nullable: false})
  username!: string;

  @Exclude()
  @Column({type: 'varchar', length: 60, nullable: false})
  password!: string;

  @Column({type: 'varchar', length: 42, nullable: false})
  address!: string;

  @Column({type: 'float', default: 0.0})
  balance!: number;

  @Exclude()
  @Column({type: 'varchar'})
  privateKey!: string;

  @OneToMany(() => Tokens, token => token.username)
  tokens: Tokens[];

  constructor(partial: Partial<Users>) {
    super();
    Object.assign(this, partial);
  }
}
