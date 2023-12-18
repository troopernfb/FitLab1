import { Repository } from 'typeorm';
import { BaseExerciseEntity } from '../entity/base-exercise.entity';
import { CreateBaseExerciseDto } from '../dtos/create-base-exercise.dto';
export declare class ExerciseService {
    private baseExerciseRepository;
    constructor(baseExerciseRepository: Repository<BaseExerciseEntity>);
    createBaseExercise(createBaseExerciseDto: CreateBaseExerciseDto): Promise<BaseExerciseEntity>;
    getAllBaseExercises(): Promise<BaseExerciseEntity[]>;
}
