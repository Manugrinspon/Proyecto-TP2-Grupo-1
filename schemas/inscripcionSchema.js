import { z } from "zod";

const id = (label) => z.number().int().positive(`${label} debe ser un número entero positivo`);

const createInscripcionSchema = z.object ({
    alumnoId: id("alumnoId"),
    cursoId: id("cursoId"),
});

const queryInscripcionSchema = z.object({
    alumnoId: id("alumnoId").optional(),
    cursoId: id("cursoId").optional(),
});

const inscripcionIdParamsSchema = z.object({
    id: id("id"),
});

export {
    createInscripcionSchema,
    queryInscripcionSchema,
    inscripcionIdParamsSchema
};