import express from "express";
import validate, { validateQuery, validateParams } from "../middlewares/validate.js";
import { queryAlumnoSchema, queryAlumnoByIdSchema, createAlumnoSchema, updateAlumnoSchema } from "../schemas/alumnoSchema.js";

function createAlumnosRoutes(alumnosController) {
    const router = express.Router();

    // Usamos listAlumnos en lugar de list
    router.get("/", validateQuery(queryAlumnoSchema), alumnosController.listAlumnos);

    router.get("/:id", validate(queryAlumnoByIdSchema), alumnosController.get);

    router.post("/", validate(createAlumnoSchema), alumnosController.create);

    router.put("/:id", validate(updateAlumnoSchema), alumnosController.update);

    router.delete("/:id", alumnosController.delete);

    return router;
}

export default createAlumnosRoutes;