import { Entity, Column, JoinColumn, OneToOne, Index } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { AuthenticationEntity } from '../../auth/entities/auth.entity';

@Entity({ name: "user_details" })
export class UserEntity extends AbstractEntity {

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  username: string;

  @OneToOne(
    () => AuthenticationEntity,
    (authentication: AuthenticationEntity) => authentication.user,
    { eager: true, nullable: false, onDelete: "CASCADE" },
  )
  @JoinColumn()
  @Index()
  public authentication: AuthenticationEntity;

  @Column({ default: true })
  isActive: boolean;
}