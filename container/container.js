import { getAlumnosDao, getCursosDao, getInscripcionesDao, getProfesoresDao } from "../dao/daoFactory.js";

import AlumnosController from "../controllers/alumnosController.js";
import CursosController from "../controllers/cursosController.js";
import InscripcionesController from "../controllers/inscripcionesController.js";
import ProfesoresController from "../controllers/profesoresController.js";

import createAlumnosRoutes from "../routes/alumnosRoutes.js";
import createCursosRoutes from "../routes/cursosRoutes.js";
import createInscripcionesRoutes from "../routes/inscripcionesRoutes.js";
import createProfesoresRoutes from "../routes/profesoresRoutes.js";

import makeAlumnosUseCases from "../useCases/alumnos/makeAlumnosUseCases.js";
import makeCursosUseCases from "../useCases/cursos/makeCursosUseCases.js";
import makeInscripcionesUseCases from "../useCases/inscripciones/makeInscripcionesUseCases.js";
import makeProfesoresUseCases from "../useCases/profesores/makeProfesoresUseCases.js";
    
import createEventBus from "../events/eventBus.js";
import { getNotifier } from "../notifications/notifierFactory.js";
import registerAlertListeners from "../alerts/registerAlertListeners.js";
import { Router } from "express";

async function buildContainer() {

    const alumnosDao = getAlumnosDao();
    if (typeof alumnosDao.init === "function") await alumnosDao.init();

    const profesoresDao = getProfesoresDao();
    if (typeof profesoresDao.init === "function") await profesoresDao.init();

    const cursosDao = getCursosDao();
    if (typeof cursosDao.init === "function") await cursosDao.init();

    const inscripcionesDao = getInscripcionesDao();
    if (typeof inscripcionesDao.init === "function") await inscripcionesDao.init();
    
    const events = createEventBus();
    registerAlertListeners(events, getNotifier());

    const alumnosUseCases = makeAlumnosUseCases(alumnosDao, inscripcionesDao, events);
    const alumnosController = new AlumnosController(alumnosUseCases);

    const router = Router();
    router.use("/alumnos", createAlumnosRoutes(alumnosController));

    const cursosUseCases = makeCursosUseCases(cursosDao, profesoresDao, inscripcionesDao, events);
    const cursosController = new CursosController(cursosUseCases);
    router.use("/cursos", createCursosRoutes(cursosController));

    const inscripcionesUseCases = makeInscripcionesUseCases(inscripcionesDao, alumnosDao, cursosDao, events);
    const inscripcionesController = new InscripcionesController(inscripcionesUseCases);
    router.use("/inscripciones", createInscripcionesRoutes(inscripcionesController));

    const profesoresUseCases = makeProfesoresUseCases(profesoresDao, cursosDao, events);
    const profesoresController = new ProfesoresController(profesoresUseCases);
    router.use("/profesores", createProfesoresRoutes(profesoresController));

    return router;
}

export default buildContainer;