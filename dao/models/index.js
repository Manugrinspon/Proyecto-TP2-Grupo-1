import { sequelize } from '../../connection/index.js';
import AlumnoModel from './AlumnoModel.js';
import InscripcionModel from './InscripcionModel.js'; 
import CursoModel from './CursoModel.js';
import ProfesorModel from './ProfesorModel.js';

AlumnoModel.belongsToMany(CursoModel, { through: InscripcionModel, foreignKey: 'alumnoId', otherKey: 'cursoId', as: 'cursos' });
CursoModel.belongsToMany(AlumnoModel, { through: InscripcionModel, foreignKey: 'cursoId', otherKey: 'alumnoId', as: 'alumnos' });

InscripcionModel.belongsTo(AlumnoModel, { foreignKey: 'alumnoId', as: 'alumno' });
InscripcionModel.belongsTo(CursoModel, { foreignKey: 'cursoId', as: 'curso' });

ProfesorModel.hasMany(CursoModel, { foreignKey: 'profesorId', as: 'cursos' });
CursoModel.belongsTo(ProfesorModel, { foreignKey: 'profesorId', as: 'profesor' });

export { sequelize, AlumnoModel, InscripcionModel, CursoModel, ProfesorModel };