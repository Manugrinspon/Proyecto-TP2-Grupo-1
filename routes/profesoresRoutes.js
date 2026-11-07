import express from "express";
import validate, { validateQuery, validateParams } from "../middlewares/validate.js";
import { createProfesorSchema, updateProfesorSchema, queryProfesorSchema, profesorIdParamsSchema } from "../schemas/profesorSchema.js";

function createProfesoresRoutes(controller) {
    const router = express.Router();

    router.get("/", validateQuery(queryProfesorSchema), controller.list);
    router.get("/:id", validateParams(profesorIdParamsSchema), controller.get);
    router.post("/", validate(createProfesorSchema), controller.create);
    router.put("/:id", validateParams(profesorIdParamsSchema), validate(updateProfesorSchema), controller.update);
    router.delete("/:id", validateParams(profesorIdParamsSchema), controller.delete);

    return router;
}

export default createProfesoresRoutes;