import { Body, Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { ExerciseService } from '../service/exercise.service';
import { JwtAccessAuthGuard } from '../../auth/guards/jwt-access-auth.guard';
import { CreateBaseExerciseDto } from '../dtos/create-base-exercise.dto';
import { BaseExerciseEntity } from '../entity/base-exercise.entity';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) { }

  @UseGuards(JwtAccessAuthGuard)
  @Post()
  async createBaseExercise(
    @Body() createBaseExerciseDto: CreateBaseExerciseDto
  ): Promise<BaseExerciseEntity> {
    return await this.exerciseService.createBaseExercise(createBaseExerciseDto);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get()
  async getAllBaseExercises(@Request() req): Promise<BaseExerciseEntity[]> {
    return await this.exerciseService.getAllBaseExercises();
  }
}
