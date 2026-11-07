import express from "express";
import validate, { validateQuery, validateParams } from "../middlewares/validate.js";
import { createCursoSchema, updateCursoSchema, queryCursoSchema, cursoIdParamsSchema } from "../schemas/cursoSchema.js";
import CursosController from "../controllers/cursosController.js";

function createCursosRoutes(cursosController) {
    const router = express.Router();

    router.get("/", validateQuery(queryCursoSchema), cursosController.list);
    router.get("/:id", validateParams(cursoIdParamsSchema), cursosController.get);
    router.post("/", validate(createCursoSchema), cursosController.create);
    router.put("/:id", validateParams(cursoIdParamsSchema), validate(updateCursoSchema), cursosController.update);
    router.delete("/:id", validateParams(cursoIdParamsSchema), cursosController.delete);

    return router;
}

export default createCursosRoutes;