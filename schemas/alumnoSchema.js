import { z } from "zod";

const fields = {
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    email: z.string().email("El email debe ser válido"),
    legajo: z.number().int().positive("El legajo debe ser un número entero positivo"),
};

const createAlumnoSchema = z.object(fields);

const updateAlumnoSchema = z.object({
    ...fields,
    id: z.number().int().positive("El ID debe ser un número entero positivo"),
});

const paginationSchema = z.object({
    page: z.number().int().positive("La página debe ser un número entero positivo").optional(),
    limit: z.number().int().positive("El límite debe ser un número entero positivo").optional(),
});

const queryAlumnoSchema = z.object({
    nombre: z.string().optional(),
    email: z.string().email("El email debe ser válido").optional(),
    legajo: z.number().int().positive("El legajo debe ser un número entero positivo").optional(),
});

const queryAlumnoByIdSchema = z.object({
    id: z.number().int().positive("El ID debe ser un número entero positivo"),
});

const alumnoIdParamsSchema = z.object({
    id: z.number().int().positive("El ID debe ser un número entero positivo"),
});

export {
    createAlumnoSchema,
    updateAlumnoSchema,
    paginationSchema,
    queryAlumnoSchema,
    queryAlumnoByIdSchema,
    alumnoIdParamsSchema
};