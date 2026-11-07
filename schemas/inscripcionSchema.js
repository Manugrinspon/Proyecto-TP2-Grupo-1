import { z } from "zod";

const bodyId = (label) => z.number().int().positive(`${label} debe ser un número entero positivo`);
const urlId = (label) => z.coerce.number().int().positive(`${label} debe ser un número entero positivo`);

const createInscripcionSchema = z.object({
    alumnoId: bodyId("alumnoId"),
    cursoId: bodyId("cursoId"),
});

const queryInscripcionSchema = z.object({
    alumnoId: urlId("alumnoId").optional(),
    cursoId: urlId("cursoId").optional(),
});

const inscripcionIdParamsSchema = z.object({
    id: urlId("id"),
});

export { createInscripcionSchema, queryInscripcionSchema, inscripcionIdParamsSchema };