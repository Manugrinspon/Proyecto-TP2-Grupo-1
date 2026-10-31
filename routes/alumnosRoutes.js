import express from "express";
import validate, { validateQuery, validateParams} from "../middlewares/validate.js";
import { queryAlumnoSchema, queryAlumnoByIdSchema, createAlumnoSchema, updateAlumnoSchema } from "../schemas/alumnoSchema.js";

function createAlumnosRoutes(alumnosUseCases) {
    const router = express.Router();

    router.get("/", validate(queryAlumnoSchema), async (req, res, next) => {
        try {
            const alumnos = await alumnosUseCases.getAlumnos(req.query);
            res.json(alumnos);
        } catch (error) {
            next(error);
        }
    });

    router.get("/:id", validate(queryAlumnoByIdSchema), async (req, res, next) => {
        try {
            const alumno = await alumnosUseCases.getAlumnoById(req.params.id);
            res.json(alumno);
        } catch (error) {
            next(error);
        }
    });
    router.post("/", validate(createAlumnoSchema), async (req, res, next) => {
        try {
            const createdAlumno = await alumnosUseCases.createAlumno(req.body);
            res.status(201).json(createdAlumno);
        } catch (error) {
            next(error);
        }
    });
    router.put("/:id", validate(updateAlumnoSchema), async (req, res, next) => {
        try {
            const updatedAlumno = await alumnosUseCases.updateAlumno(req.params.id, req.body);
            res.json(updatedAlumno);
        } catch (error) {
            next(error);
        }
    });
    router.delete("/:id", validate(deleteAlumnoSchema), async (req, res, next) => {
        try {
            await alumnosUseCases.deleteAlumno(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    });
    return router;
}

export default createAlumnosRoutes;