import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseExerciseEntity } from '../entity/base-exercise.entity';
import { CreateBaseExerciseDto } from '../dtos/create-base-exercise.dto';
import { PostgresErrorCode } from '../../database/constraints';
import { UserAlreadyExistException } from '../../auth/exceptions';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(BaseExerciseEntity)
    private baseExerciseRepository: Repository<BaseExerciseEntity>,
  ) { }

  async createBaseExercise(createBaseExerciseDto: CreateBaseExerciseDto): Promise<BaseExerciseEntity> {
    try {
      const baseExercise = this.baseExerciseRepository.create(createBaseExerciseDto)
      return this.baseExerciseRepository.save(baseExercise);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException(error);
      }
      throw new InternalServerErrorException();
    }
  }

  async getAllBaseExercises(): Promise<BaseExerciseEntity[]> {
    return await this.baseExerciseRepository.find();
  }
}
