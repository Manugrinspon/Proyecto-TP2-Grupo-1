import express from "express";
import validate, { validateQuery, validateParams } from "../middlewares/validate.js";
import { queryAlumnoSchema, queryAlumnoByIdSchema, createAlumnoSchema, updateAlumnoSchema, alumnoIdParamsSchema } from "../schemas/alumnoSchema.js";

function createAlumnosRoutes(alumnosController) {
    const router = express.Router();

    // Usamos listAlumnos en lugar de list
    router.get("/", validateQuery(queryAlumnoSchema), alumnosController.listAlumnos);

    router.get("/:id", validateParams(queryAlumnoByIdSchema), alumnosController.get);

    router.post("/", validate(createAlumnoSchema), alumnosController.create);

    router.put("/:id", validateParams(alumnoIdParamsSchema), validate(updateAlumnoSchema), alumnosController.update);

    router.delete("/:id", validateParams(alumnoIdParamsSchema), alumnosController.delete);
    return router;
}

export default createAlumnosRoutes;