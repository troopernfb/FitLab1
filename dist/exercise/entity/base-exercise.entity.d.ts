import { AbstractEntity } from "../../common";
import { UnitOfMeasurement } from "../enum/unit-of-measurement.enum";
export declare class BaseExerciseEntity extends AbstractEntity {
    name: string;
    description: string;
    unitOfMeasurement: UnitOfMeasurement;
}
