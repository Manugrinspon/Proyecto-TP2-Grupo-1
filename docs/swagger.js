const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "API Gestión de Cursos - TP2 Grupo 1",
    version: "1.0.0",
    description:
      "API RESTful para la gestión de alumnos, profesores, cursos e inscripciones con arquitectura en capas, persistencia intercambiable y eventos desacoplados.",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Servidor Local",
    },
  ],
  tags: [
    { name: "Alumnos", description: "Gestión de alumnos" },
    { name: "Profesores", description: "Gestión de profesores" },
    { name: "Cursos", description: "Gestión de cursos y cupos" },
    { name: "Inscripciones", description: "Inscripción de alumnos en cursos" },
  ],
  paths: {
    "/alumnos": {
      get: {
        tags: ["Alumnos"],
        summary: "Listar alumnos",
        description: "Obtiene la lista de alumnos con soporte para filtros, ordenamiento y paginación.",
        parameters: [
          { name: "nombre", in: "query", schema: { type: "string" }, description: "Filtrar por nombre (coincidencia parcial)" },
          { name: "email", in: "query", schema: { type: "string", format: "email" }, description: "Filtrar por email exacto" },
          { name: "legajo", in: "query", schema: { type: "string" }, description: "Filtrar por legajo exacto" },
          { name: "sort", in: "query", schema: { type: "string", enum: ["nombre", "email", "legajo"] }, description: "Campo de ordenamiento ascendente" },
          { name: "page", in: "query", schema: { type: "integer", minimum: 1 }, description: "Número de página (requiere limit)" },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1 }, description: "Cantidad máxima de resultados por página" },
        ],
        responses: {
          "200": {
            description: "Lista de alumnos",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Alumno" } },
              },
            },
          },
          "400": {
            description: "Parámetros de consulta inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      post: {
        tags: ["Alumnos"],
        summary: "Crear un alumno",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/AlumnoInput" } } },
        },
        responses: {
          "201": {
            description: "Alumno creado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Alumno" } } },
          },
          "400": {
            description: "Error de validación",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "409": {
            description: "Conflicto (nombre y apellido, email o legajo ya registrados)",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/alumnos/{id}": {
      get: {
        tags: ["Alumnos"],
        summary: "Obtener un alumno por ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del alumno" },
        ],
        responses: {
          "200": {
            description: "Alumno encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Alumno" } } },
          },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Alumno no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      put: {
        tags: ["Alumnos"],
        summary: "Actualizar un alumno",
        description: "Actualiza uno o más campos de un alumno existente.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del alumno" },
        ],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/AlumnoUpdateInput" } } },
        },
        responses: {
          "200": {
            description: "Alumno actualizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Alumno" } } },
          },
          "400": {
            description: "Error de validación",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Alumno no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "409": {
            description: "Conflicto (email o legajo ya registrados por otro alumno)",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      delete: {
        tags: ["Alumnos"],
        summary: "Eliminar un alumno",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del alumno" },
        ],
        responses: {
          "204": { description: "Alumno eliminado" },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Alumno no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "409": {
            description: "No se puede eliminar porque tiene inscripciones activas",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/profesores": {
      get: {
        tags: ["Profesores"],
        summary: "Listar profesores",
        description: "Obtiene la lista de profesores con soporte para filtros, ordenamiento y paginación.",
        parameters: [
          { name: "nombre", in: "query", schema: { type: "string" }, description: "Filtrar por nombre (coincidencia parcial)" },
          { name: "email", in: "query", schema: { type: "string", format: "email" }, description: "Filtrar por email exacto" },
          { name: "especialidad", in: "query", schema: { type: "string" }, description: "Filtrar por especialidad (coincidencia parcial)" },
          { name: "sort", in: "query", schema: { type: "string", enum: ["nombre", "email", "especialidad"] }, description: "Campo de ordenamiento ascendente" },
          { name: "page", in: "query", schema: { type: "integer", minimum: 1 }, description: "Número de página (requiere limit)" },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1 }, description: "Cantidad máxima de resultados por página" },
        ],
        responses: {
          "200": {
            description: "Lista de profesores",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Profesor" } },
              },
            },
          },
          "400": {
            description: "Parámetros de consulta inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      post: {
        tags: ["Profesores"],
        summary: "Crear un profesor",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ProfesorInput" } } },
        },
        responses: {
          "201": {
            description: "Profesor creado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Profesor" } } },
          },
          "400": {
            description: "Error de validación",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "409": {
            description: "Conflicto (email, nombre o especialidad ya registrados)",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/profesores/{id}": {
      get: {
        tags: ["Profesores"],
        summary: "Obtener un profesor por ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del profesor" },
        ],
        responses: {
          "200": {
            description: "Profesor encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Profesor" } } },
          },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Profesor no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      put: {
        tags: ["Profesores"],
        summary: "Actualizar un profesor",
        description: "Actualiza uno o más campos de un profesor existente.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del profesor" },
        ],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ProfesorUpdateInput" } } },
        },
        responses: {
          "200": {
            description: "Profesor actualizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Profesor" } } },
          },
          "400": {
            description: "Error de validación",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Profesor no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      delete: {
        tags: ["Profesores"],
        summary: "Eliminar un profesor",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del profesor" },
        ],
        responses: {
          "204": { description: "Profesor eliminado" },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Profesor no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "409": {
            description: "No se puede eliminar porque tiene cursos asignados",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/cursos": {
      get: {
        tags: ["Cursos"],
        summary: "Listar cursos",
        description: "Obtiene la lista de cursos con soporte para filtros, ordenamiento y paginación.",
        parameters: [
          { name: "nombre", in: "query", schema: { type: "string" }, description: "Filtrar por nombre (coincidencia parcial)" },
          { name: "profesorId", in: "query", schema: { type: "integer", minimum: 1 }, description: "Filtrar por ID del profesor" },
          { name: "sort", in: "query", schema: { type: "string", enum: ["nombre", "cupo_disponible"] }, description: "Campo de ordenamiento ascendente" },
          { name: "page", in: "query", schema: { type: "integer", minimum: 1 }, description: "Número de página (requiere limit)" },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1 }, description: "Cantidad máxima de resultados por página" },
        ],
        responses: {
          "200": {
            description: "Lista de cursos",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Curso" } },
              },
            },
          },
          "400": {
            description: "Parámetros de consulta inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      post: {
        tags: ["Cursos"],
        summary: "Crear un curso",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CursoInput" } } },
        },
        responses: {
          "201": {
            description: "Curso creado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Curso" } } },
          },
          "400": {
            description: "Error de validación (incluye cupo_disponible mayor a cupo_maximo)",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Profesor asignado no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/cursos/{id}": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener un curso por ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del curso" },
        ],
        responses: {
          "200": {
            description: "Curso encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Curso" } } },
          },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Curso no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      put: {
        tags: ["Cursos"],
        summary: "Actualizar un curso",
        description: "Reemplaza los datos del curso (requiere todos los campos excepto cupo_disponible).",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del curso" },
        ],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CursoInput" } } },
        },
        responses: {
          "200": {
            description: "Curso actualizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Curso" } } },
          },
          "400": {
            description: "Error de validación",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Curso o profesor no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      delete: {
        tags: ["Cursos"],
        summary: "Eliminar un curso",
        description: "Elimina el curso y todas sus inscripciones asociadas en cascada.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID del curso" },
        ],
        responses: {
          "204": { description: "Curso eliminado" },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Curso no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/inscripciones": {
      get: {
        tags: ["Inscripciones"],
        summary: "Listar inscripciones",
        description: "Obtiene la lista de inscripciones incluyendo los datos del alumno y del curso asociados.",
        parameters: [
          { name: "alumnoId", in: "query", schema: { type: "integer", minimum: 1 }, description: "Filtrar por ID del alumno" },
          { name: "cursoId", in: "query", schema: { type: "integer", minimum: 1 }, description: "Filtrar por ID del curso" },
        ],
        responses: {
          "200": {
            description: "Lista de inscripciones",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/InscripcionDetalle" } },
              },
            },
          },
          "400": {
            description: "Parámetros de consulta inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      post: {
        tags: ["Inscripciones"],
        summary: "Inscribir un alumno a un curso",
        description:
          "Crea la inscripción, descuenta un lugar de cupo_disponible y emite los eventos de dominio correspondientes.",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/InscripcionInput" } } },
        },
        responses: {
          "201": {
            description: "Inscripción creada exitosamente",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Inscripcion" } } },
          },
          "400": {
            description: "Error de validación",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Alumno o curso no encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "409": {
            description: "Conflicto (inscripción duplicada o curso sin cupo disponible)",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
    "/inscripciones/{id}": {
      get: {
        tags: ["Inscripciones"],
        summary: "Obtener una inscripción por ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID de la inscripción" },
        ],
        responses: {
          "200": {
            description: "Inscripción encontrada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/InscripcionDetalle" } } },
          },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Inscripción no encontrada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
      delete: {
        tags: ["Inscripciones"],
        summary: "Eliminar una inscripción",
        description: "Elimina la inscripción y restaura un cupo disponible en el curso correspondiente.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 }, description: "ID de la inscripción" },
        ],
        responses: {
          "204": { description: "Inscripción eliminada" },
          "400": {
            description: "ID inválido",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
          "404": {
            description: "Inscripción no encontrada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Error: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            required: ["code", "message"],
            properties: {
              code: { type: "string", example: "VALIDATION_ERROR" },
              message: { type: "string", example: "Datos de body inválidos" },
              details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    field: { type: "string", example: "email" },
                    message: { type: "string", example: "Debe ser un correo electrónico válido" },
                  },
                },
              },
            },
          },
        },
      },
      AlumnoInput: {
        type: "object",
        required: ["nombre", "apellido", "email", "legajo"],
        properties: {
          nombre: { type: "string", minLength: 1, example: "Juan" },
          apellido: { type: "string", minLength: 1, example: "Pérez" },
          email: { type: "string", format: "email", example: "juan.perez@example.com" },
          legajo: { type: "string", minLength: 1, example: "54321" },
        },
      },
      AlumnoUpdateInput: {
        type: "object",
        properties: {
          nombre: { type: "string", minLength: 1, example: "Juan Carlos" },
          apellido: { type: "string", minLength: 1, example: "Pérez" },
          email: { type: "string", format: "email", example: "juan.perez@example.com" },
          legajo: { type: "string", minLength: 1, example: "54321" },
        },
      },
      Alumno: {
        allOf: [
          {
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "integer", example: 1 },
            },
          },
          { $ref: "#/components/schemas/AlumnoInput" },
        ],
      },
      ProfesorInput: {
        type: "object",
        required: ["nombre", "email", "especialidad"],
        properties: {
          nombre: { type: "string", minLength: 1, example: "Laura Díaz" },
          email: { type: "string", format: "email", example: "laura.diaz@gmail.com" },
          especialidad: { type: "string", minLength: 1, example: "Bases de datos" },
        },
      },
      ProfesorUpdateInput: {
        type: "object",
        properties: {
          nombre: { type: "string", minLength: 1, example: "Laura Díaz" },
          email: { type: "string", format: "email", example: "laura.diaz@gmail.com" },
          especialidad: { type: "string", minLength: 1, example: "DevOps" },
        },
      },
      Profesor: {
        allOf: [
          {
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "integer", example: 1 },
            },
          },
          { $ref: "#/components/schemas/ProfesorInput" },
        ],
      },
      CursoInput: {
        type: "object",
        required: ["nombre", "descripcion", "cupo_maximo", "profesorId"],
        properties: {
          nombre: { type: "string", minLength: 1, example: "Node.js Avanzado" },
          descripcion: { type: "string", minLength: 1, example: "API REST con Arquitectura Limpia" },
          cupo_maximo: { type: "integer", minimum: 1, example: 30 },
          cupo_disponible: { type: "integer", minimum: 0, example: 30 },
          profesorId: { type: "integer", minimum: 1, example: 1 },
        },
      },
      Curso: {
        allOf: [
          {
            type: "object",
            required: ["id", "cupo_disponible"],
            properties: {
              id: { type: "integer", example: 1 },
              cupo_disponible: { type: "integer", minimum: 0, example: 30 },
            },
          },
          { $ref: "#/components/schemas/CursoInput" },
        ],
      },
      InscripcionInput: {
        type: "object",
        required: ["alumnoId", "cursoId"],
        properties: {
          alumnoId: { type: "integer", minimum: 1, example: 1 },
          cursoId: { type: "integer", minimum: 1, example: 1 },
        },
      },
      Inscripcion: {
        allOf: [
          {
            type: "object",
            required: ["id"],
            properties: {
              id: { type: "integer", example: 1 },
            },
          },
          { $ref: "#/components/schemas/InscripcionInput" },
        ],
      },
      InscripcionDetalle: {
        allOf: [
          { $ref: "#/components/schemas/Inscripcion" },
          {
            type: "object",
            properties: {
              alumno: {
                nullable: true,
                allOf: [{ $ref: "#/components/schemas/Alumno" }],
              },
              curso: {
                nullable: true,
                allOf: [{ $ref: "#/components/schemas/Curso" }],
              },
            },
          },
        ],
      },
    },
  },
};

export default swaggerDoc;