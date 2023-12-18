import { AbstractEntity } from "../../common";
import { Column, Entity } from "typeorm";
import { UnitOfMeasurement } from "../enum/unit-of-measurement.enum";

@Entity({ name: "base_exercise" })
export class BaseExerciseEntity extends AbstractEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: UnitOfMeasurement,
  })
  unitOfMeasurement: UnitOfMeasurement;

  // TODO -> primaryMuscle: muscle_involvement
  // TODO -> secondaryMuscle: muscle_involvement
}