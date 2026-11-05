import express from "express";
import validate, { validateQuery, validateParams } from "../middlewares/validate.js";
import { createCursoSchema, updateCursoSchema, queryCursoSchema, cursoIdParamsSchema } from "../schemas/cursoSchema.js";
import CursosController from "../controllers/cursosController.js";

function createCursosRoutes(cursosUseCases) {
    const router = express.Router();
    const controller = new CursosController(cursosUseCases);

    router.get("/", validateQuery(queryCursoSchema), controller.list);
    router.get("/:id", validateParams(cursoIdParamsSchema), controller.get);
    router.post("/", validate(createCursoSchema), controller.create);
    router.put("/:id", validateParams(cursoIdParamsSchema), validate(updateCursoSchema), controller.update);
    router.delete("/:id", validateParams(cursoIdParamsSchema), controller.delete);

    return router;
}

export default createCursosRoutes;