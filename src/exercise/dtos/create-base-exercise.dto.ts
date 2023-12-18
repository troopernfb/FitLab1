import { IsNotEmpty } from "class-validator";


export class CreateBaseExerciseDto {
  @IsNotEmpty()
  readonly name;

  @IsNotEmpty()
  readonly description;

  @IsNotEmpty()
  readonly unitOfMeasurement;
}