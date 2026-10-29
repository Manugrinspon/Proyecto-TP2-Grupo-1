import { PERSISTENCE_TYPE } from '../config/config.js';
import AlumnosSequelizeDao from './Alumnos/AlumnosSequelizeDao.js';
import CursosSequelizeDao from './Cursos/CursosSequelizeDao.js';
import InscripcionesSequelizeDao from './Inscripciones/InscripcionesSequelizeDao.js';
import AlumnosMemoryDao from './Alumnos/AlumnosMemoryDao.js';
import CursosMemoryDao from './Cursos/CursosMemoryDao.js';
import InscripcionesMemoryDao from './Inscripciones/InscripcionesMemoryDao.js';

function getAlumnosDao() {
    if (PERSISTENCE_TYPE === "sequelize") {
    console.log("[Persistencia] Usando Sequelize (SQLite/SQL)");
    return AlumnosSequelizeDao;
  } else {
    console.log("[Persistencia] Usando Memoria (Array JS)");
    return AlumnosMemoryDao;
  }
}

function getInscripcionesDao() {
    if (PERSISTENCE_TYPE === "sequelize") {
    console.log("[Persistencia] Usando Sequelize (SQLite/SQL)");
    return InscripcionesSequelizeDao;
  } else {
    console.log("[Persistencia] Usando Memoria (Array JS)");
    return InscripcionesMemoryDao;
  }
}