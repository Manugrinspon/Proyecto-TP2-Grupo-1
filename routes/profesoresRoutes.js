import express from "express";
import validate, { validateQuery, validateParams } from "../middlewares/validate.js";
import { createProfesorSchema, updateProfesorSchema, queryProfesorSchema, profesorIdParamsSchema } from "../schemas/profesorSchema.js";
import ProfesoresController from "../controllers/profesoresController.js";

function createProfesoresRoutes(profesoresUseCases) {
    const router = express.Router();
    const controller = new ProfesoresController(profesoresUseCases);

    router.get("/", validateQuery(queryProfesorSchema), controller.list);
    router.get("/:id", validateParams(profesorIdParamsSchema), controller.get);
    router.post("/", validate(createProfesorSchema), controller.create);
    router.put("/:id", validateParams(profesorIdParamsSchema), validate(updateProfesorSchema), controller.update);
    router.delete("/:id", validateParams(profesorIdParamsSchema), controller.delete);

    return router;
}

export default createProfesoresRoutes;