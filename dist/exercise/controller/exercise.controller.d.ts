import { ExerciseService } from '../service/exercise.service';
import { CreateBaseExerciseDto } from '../dtos/create-base-exercise.dto';
import { BaseExerciseEntity } from '../entity/base-exercise.entity';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    createBaseExercise(createBaseExerciseDto: CreateBaseExerciseDto): Promise<BaseExerciseEntity>;
    getAllBaseExercises(req: any): Promise<BaseExerciseEntity[]>;
}
