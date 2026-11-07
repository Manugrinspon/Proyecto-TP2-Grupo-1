import { z } from "zod";

const id = z.coerce
  .number()
  .int()
  .positive("El ID debe ser un número entero positivo");

const fields = {
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  email: z.email({ error: "Debe ser un correo electrónico válido" }),
  legajo: z.string().min(1),
};

export const createAlumnoSchema = z.object(fields);

export const updateAlumnoSchema = z.object(fields).partial();

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive("La página debe ser un número entero positivo")
    .optional(),
  limit: z.coerce
    .number()
    .int()
    .positive("El límite debe ser un número entero positivo")
    .optional(),
});

export const queryAlumnoSchema = z.object({
  nombre: z.string().optional(),
  email: z.email().optional(),
  legajo: z.string().optional(),
  sort: z.enum(["nombre", "email", "legajo"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export const queryAlumnoByIdSchema = z.object({ id });

export const alumnoIdParamsSchema = z.object({ id });