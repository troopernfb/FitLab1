import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MuscleInvolvementEntity } from '../../exercise/entity/muscle-involvement.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {

    await dataSource.query('TRUNCATE "muscle_involvement" RESTART IDENTITY;');

    const repository = dataSource.getRepository(MuscleInvolvementEntity);

    const muscles = [
      'Pectoralis Major',
      'Latissimus Dorsi',
      'Quadriceps (Quads)',
      'Hamstrings',
      'Gastrocnemius',
      'Soleus',
      'Deltoids',
      'Trapezius',
      'Triceps Brachii',
      'Biceps Brachii',
      'Rectus Abdominis',
      'Obliques',
      'Erector Spinae',
      'Gluteus Maximus',
      'Adductors',
      'Abductors',
      'Serratus Anterior',
      'Rhomboids',
      'Transverse Abdominis',
      'Calves',
      'Forearm Flexors',
      'Forearm Extensors',
      'Tibialis Anterior',
      'Sartorius',
      'Iliopsoas',
      'Rotator Cuff',
      'Brachialis',
      'Brachioradialis',
      'Splenius Capitis',
      'Splenius Cervicis',
    ];

    const muscleInsertions = muscles.map((muscle) => ({ name: muscle }));

    await repository.insert(muscleInsertions);
  }
}