import { getAlumnoDao, getCursoDao, getInscripcionDao, getProfesorDao } from "../dao/daoFactory.js";
import alumnosController from "../controllers/alumnosController.js";
import cursosController from "../controllers/cursosController.js";
import inscripcionesController from "../controllers/inscripcionesController.js";
import profesoresController from "../controllers/profesoresController.js";
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

    const alumnosDao = getAlumnoDao();

    if (typeof alumnosDao.init === "function") {
        await alumnosDao.init();
    }

    const cursosDao = getCursoDao();

    if (typeof cursosDao.init === "function") {
        await cursosDao.init();
    }

    const inscripcionesDao = getInscripcionDao();

    if (typeof inscripcionesDao.init === "function") {
        await inscripcionesDao.init();
    }

    const profesoresDao = getProfesorDao();

    if (typeof profesoresDao.init === "function") {
        await profesoresDao.init();
    }

    const events = createEventBus();
    registerAlertListeners(events, getNotifier());

    const alumnosUseCases = makeAlumnosUseCases(alumnosDao, events);
    const alumnosController = new alumnosController(alumnosUseCases);

    const router = Router();
    router.use("/alumnos", createAlumnosRouter(alumnosController));

    const cursosUseCases = makeCursosUseCases(cursosDao, events);
    const cursosController = new cursosController(cursosUseCases);
    router.use("/cursos", createCursosRouter(cursosController));

    const inscripcionesUseCases = makeInscripcionesUseCases(inscripcionesDao, events);
    const inscripcionesController = new inscripcionesController(inscripcionesUseCases);
    router.use("/inscripciones", createInscripcionesRouter(inscripcionesController));

    const profesoresUseCases = makeProfesoresUseCases(profesoresDao, events);
    const profesoresController = new profesoresController(profesoresUseCases);
    router.use("/profesores", createProfesoresRouter(profesoresController));

    return router;
}

export default buildContainer;