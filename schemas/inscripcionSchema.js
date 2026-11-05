import { z } from "zod";

const id = (label) => z.number().int().positive(`${label} debe ser un número entero positivo`);

const createInscripcionSchema = {
    alumnoId: id("alumnoId"),
    cursoId: id("cursoId"),
};

const queryInscripcionSchema = {
    alumnoId: id("alumnoId").optional(),
    cursoId: id("cursoId").optional(),
};

const inscripcionIdParamsSchema = z.object({
    id: id("id"),
});

export {
    createInscripcionSchema,
    queryInscripcionSchema,
    inscripcionIdParamsSchema
};