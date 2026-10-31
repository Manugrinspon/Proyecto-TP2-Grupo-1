import express from "express";
import validate from "../middlewares/validate.js";
import { createInscripcionSchema, queryInscripcionSchema, inscripcionIdParamsSchema } from "../schemas/inscripcionSchema.js";

function createInscripcionesRoutes(inscripcionesUseCases) {
    const router = express.Router();

    router.get("/", validate(queryInscripcionSchema), async (req, res, next) => {
        try {
            const inscripciones = await inscripcionesUseCases.getInscripciones(req.query);
            res.json(inscripciones);
        } catch (error) {
            next(error);
        }
    });

    router.get("/:id", validate(inscripcionIdParamsSchema), async (req, res, next) => {
        try {
            const inscripcion = await inscripcionesUseCases.getInscripcionById(req.params.id);
            res.json(inscripcion);
        } catch (error) {
            next(error);
        }
    });

    router.post("/", validate(createInscripcionSchema), async (req, res, next) => {
        try {
            const createdInscripcion = await inscripcionesUseCases.createInscripcion(req.body);
            res.status(201).json(createdInscripcion);
        } catch (error) {
            next(error);
        }
    });

    return router;
}

export default createInscripcionesRoutes;