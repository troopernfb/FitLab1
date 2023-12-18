import { Exclude } from "class-transformer";
import { AbstractEntity } from "../../common/entities/abstract.entity";
import { UserEntity } from "../../user/entities/user.entity";
import * as bcrypt from 'bcrypt'
import { BeforeInsert, Column, Entity, OneToOne } from "typeorm";
import { SALT } from "../constants/auth.constants";


@Entity({ name: "user_credentials" })
export class AuthenticationEntity extends AbstractEntity {
  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  public refreshToken: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.authentication)
  @Exclude()
  public user: UserEntity;


  @BeforeInsert()
  async formatEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT.ROUNDS)
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    return this.refreshToken === refreshToken;
  }
}