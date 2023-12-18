import { Module } from '@nestjs/common';
import { ExerciseService } from './service/exercise.service';
import { ExerciseController } from './controller/exercise.controller';
import { BaseExerciseEntity } from './entity/base-exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaseExerciseEntity]),
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule { }
