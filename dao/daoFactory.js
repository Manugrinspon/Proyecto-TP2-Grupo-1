import { PERSISTENCE_TYPE } from '../config/config.js';
import AlumnosSequelizeDao from './alumnos/AlumnosSequelizeDao.js';
import CursosSequelizeDao from './cursos/CursosSequelizeDao.js';
import InscripcionesSequelizeDao from './inscripciones/InscripcionesSequelizeDao.js';
import AlumnosMemoryDao from './alumnos/AlumnosMemoryDao.js';
import CursosMemoryDao from './cursos/CursosMemoryDao.js';
import InscripcionesMemoryDao from './inscripciones/InscripcionesMemoryDao.js';
import ProfesoresSequelizeDao from './profesores/ProfesoresSequelizeDao.js';
import ProfesoresMemoryDao from './profesores/ProfesoresMemoryDao.js';

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

function getProfesoresDao() {
    if (PERSISTENCE_TYPE === "sequelize") {
        console.log("[Persistencia] Usando Sequelize (SQLite/SQL)");
        return ProfesoresSequelizeDao;
    } else {
        console.log("[Persistencia] Usando Memoria (Array JS)");
        return ProfesoresMemoryDao;
    }
}

function getCursosDao() {
    if (PERSISTENCE_TYPE === "sequelize") {
        console.log("[Persistencia] Usando Sequelize (SQLite/SQL)");
        return CursosSequelizeDao;
    } else {
        console.log("[Persistencia] Usando Memoria (Array JS)");
        return CursosMemoryDao;
    }
}

export {
    getAlumnosDao,
    getInscripcionesDao,
    getProfesoresDao,
    getCursosDao
};