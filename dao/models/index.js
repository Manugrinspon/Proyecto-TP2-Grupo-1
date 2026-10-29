import { sequelize } from '../../connection/index.js';
import AlumnosModel from './AlumnoModel.js';
import InscripcionModel from './InscripcionModel.js'; 
import CursosModel from './CursoModel.js';

AlumnosModel.belongsToMany(CursosModel, { through: InscripcionModel, foreignKey: 'alumnoId', otherKey: 'cursoId', as: 'cursos' });
CursosModel.belongsToMany(AlumnosModel, { through: InscripcionModel, foreignKey: 'cursoId', otherKey: 'alumnoId', as: 'alumnos' });

InscripcionModel.belongsTo(AlumnosModel, { foreignKey: 'alumnoId', as: 'alumno' });
InscripcionModel.belongsTo(CursosModel, { foreignKey: 'cursoId', as: 'curso' });

export { sequelize, AlumnosModel, InscripcionModel, CursosModel };