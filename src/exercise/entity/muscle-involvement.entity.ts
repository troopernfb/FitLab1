import { AbstractEntity } from "../../common";
import { Column, Entity } from "typeorm";
import { UnitOfMeasurement } from "../enum/unit-of-measurement.enum";

@Entity({ name: "muscle_involvement" })
export class MuscleInvolvementEntity extends AbstractEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  name: string;
}