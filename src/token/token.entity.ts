import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Users} from 'src/user/user.entity';

@Entity('tokens')
export class Tokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar', length: 30, nullable: false})
  username!: string;

  @Column({type: 'varchar', length: 3, nullable: false})
  symbol!: string;

  @Column({type: 'float', nullable: false})
  balance!: number;

  @ManyToOne(() => Users, user => user.tokens)
  user!: Users;
}
