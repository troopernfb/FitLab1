"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const muscle_involvement_entity_1 = require("../../exercise/entity/muscle-involvement.entity");
class UserSeeder {
    async run(dataSource, factoryManager) {
        await dataSource.query('TRUNCATE "muscle_involvement" RESTART IDENTITY;');
        const repository = dataSource.getRepository(muscle_involvement_entity_1.MuscleInvolvementEntity);
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
exports.default = UserSeeder;
//# sourceMappingURL=muscle-involvement.seeder.js.map