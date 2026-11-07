import express from "express";
import validate, { validateQuery, validateParams } from "../middlewares/validate.js";
import { createInscripcionSchema, queryInscripcionSchema, inscripcionIdParamsSchema } from "../schemas/inscripcionSchema.js";

function createInscripcionesRoutes(controller) {
    const router = express.Router();

    router.get("/", validateQuery(queryInscripcionSchema), controller.list);
    router.get("/:id", validateParams(inscripcionIdParamsSchema), controller.get);
    router.post("/", validate(createInscripcionSchema), controller.create);
    router.delete("/:id", validateParams(inscripcionIdParamsSchema), controller.delete);

    return router;
}

export default createInscripcionesRoutes;