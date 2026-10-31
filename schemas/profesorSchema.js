import { z } from "zod";

const fields = {
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El email debe ser válido"),
    especialidad: z.string().min(1, "La especialidad es obligatoria"),
};

const createProfesorSchema = z.object(fields);

const updateProfesorSchema = z.object({
    ...fields,
    id: z.number().int().positive("El ID debe ser un número entero positivo"),
});

const queryProfesorSchema = z.object({
    nombre: z.string().optional(),
    email: z.string().email("El email debe ser válido").optional(),
    especialidad: z.string().optional(),
    page: z.number().int().positive("La página debe ser un número entero positivo").optional(),
    limit: z.number().int().positive("El límite debe ser un número entero positivo").optional(),
});

const profesorIdParamsSchema = z.object({
    id: z.number().int().positive("El ID debe ser un número entero positivo"),
});

export {
    createProfesorSchema,
    updateProfesorSchema,
    queryProfesorSchema,
    profesorIdParamsSchema
};