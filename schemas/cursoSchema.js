import { z } from "zod";

const fields = {
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().min(1, "La descripción es obligatoria"),
    cupo_maximo: z.number().int().positive("El cupo máximo debe ser un número entero positivo"),
    cupo_disponible: z.number().int().nonnegative("El cupo disponible no puede ser negativo").optional(),
    profesorId: z.number().int().positive("El ID del profesor debe ser un número entero positivo"),
};

const createCursoSchema = z.object(fields);

const updateCursoSchema = z.object({
    ...fields,
    id: z.number().int().positive("El ID debe ser un número entero positivo"),
});

const queryCursoSchema = z.object({
    nombre: z.string().optional(),
    profesorId: z.number().int().positive("El ID del profesor debe ser un número entero positivo").optional(),
    page: z.number().int().positive("La página debe ser un número entero positivo").optional(),
    limit: z.number().int().positive("El límite debe ser un número entero positivo").optional(),
});

const cursoIdParamsSchema = z.object({
    id: z.number().int().positive("El ID debe ser un número entero positivo"),
});

export {
    createCursoSchema,
    updateCursoSchema,
    queryCursoSchema,
    cursoIdParamsSchema
};