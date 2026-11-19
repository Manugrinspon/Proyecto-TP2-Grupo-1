const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "API Gestión de Cursos - TP2 Grupo 1",
    version: "1.0.0",
    description: "API RESTful para la gestión de alumnos, profesores, cursos e inscripciones con arquitectura en capas y persistencia intercambiable.",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Servidor Local",
    },
  ],
  paths: {
    "/alumnos": {
      get: {
        summary: "Listar alumnos",
        description: "Obtiene una lista de alumnos con soporte para filtros y paginación.",
        parameters: [
          { name: "nombre", in: "query", schema: { type: "string" }, description: "Filtrar por nombre" },
          { name: "email", in: "query", schema: { type: "string" }, description: "Filtrar por email" },
          { name: "legajo", in: "query", schema: { type: "string" }, description: "Filtrar por legajo" },
          { name: "page", in: "query", schema: { type: "integer", default: 1 }, description: "Número de página" },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 }, description: "Límite de resultados" }
        ],
        responses: {
          200: { description: "Lista de alumnos", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Alumno" } } } } }
        }
      },
      post: {
        summary: "Crear un alumno",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/AlumnoInput" } } } },
        responses: {
          201: { description: "Alumno creado", content: { "application/json": { schema: { $ref: "#/components/schemas/Alumno" } } } },
          400: { description: "Error de validación", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          409: { description: "Conflicto (Email o Legajo duplicado)", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      }
    },
    "/alumnos/{id}": {
      get: {
        summary: "Obtener un alumno por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Alumno encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Alumno" } } } },
          404: { description: "Alumno no encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      },
      put: {
        summary: "Actualizar un alumno",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/AlumnoInput" } } } },
        responses: {
          200: { description: "Alumno actualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Alumno" } } } },
          404: { description: "Alumno no encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      },
      delete: {
        summary: "Eliminar un alumno",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          204: { description: "Alumno eliminado" },
          404: { description: "Alumno no encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          409: { description: "No se puede eliminar porque tiene inscripciones activas", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      }
    },
    "/profesores": {
      get: {
        summary: "Listar profesores",
        responses: {
          200: { description: "Lista de profesores", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Profesor" } } } } }
        }
      },
      post: {
        summary: "Crear un profesor",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProfesorInput" } } } },
        responses: {
          201: { description: "Profesor creado" },
          400: { description: "Error de validación" },
          409: { description: "Conflicto (Email duplicado)" }
        }
      }
    },
    "/profesores/{id}": {
      get: {
        summary: "Obtener un profesor por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Profesor encontrado" },
          404: { description: "Profesor no encontrado" }
        }
      },
      put: {
        summary: "Actualizar un profesor",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProfesorInput" } } } },
        responses: {
          200: { description: "Profesor actualizado" },
          404: { description: "Profesor no encontrado" }
        }
      },
      delete: {
        summary: "Eliminar un profesor",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          204: { description: "Profesor eliminado" },
          404: { description: "Profesor no encontrado" },
          409: { description: "Profesor con cursos asignados" }
        }
      }
    },
    "/cursos": {
      get: {
        summary: "Listar cursos",
        responses: {
          200: { description: "Lista de cursos", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Curso" } } } } }
        }
      },
      post: {
        summary: "Crear un curso",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CursoInput" } } } },
        responses: {
          201: { description: "Curso creado" },
          404: { description: "Profesor asignado no existe" }
        }
      }
    },
    "/cursos/{id}": {
      get: {
        summary: "Obtener un curso por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Curso encontrado" },
          404: { description: "Curso no encontrado" }
        }
      },
      put: {
        summary: "Actualizar un curso",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CursoInput" } } } },
        responses: {
          200: { description: "Curso actualizado" },
          404: { description: "Curso o Profesor no encontrado" }
        }
      },
      delete: {
        summary: "Eliminar un curso",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          204: { description: "Curso eliminado" },
          404: { description: "Curso no encontrado" }
        }
      }
    },
    "/inscripciones": {
      get: {
        summary: "Listar inscripciones",
        responses: {
          200: { description: "Lista de inscripciones", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Inscripcion" } } } } }
        }
      },
      post: {
        summary: "Inscribir un alumno a un curso",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/InscripcionInput" } } } },
        responses: {
          201: { description: "Inscripción creada exitosamente" },
          404: { description: "Alumno o Curso no encontrado" },
          409: { description: "Inscripción duplicada o sin cupo" }
        }
      }
    },
    "/inscripciones/{id}": {
      get: {
        summary: "Obtener una inscripción por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Inscripción encontrada" },
          404: { description: "Inscripción no encontrada" }
        }
      },
      delete: {
        summary: "Eliminar una inscripción",
        description: "Elimina la inscripción y restaura un cupo en el curso correspondiente.",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          204: { description: "Inscripción eliminada" },
          404: { description: "Inscripción no encontrada" }
        }
      }
    }
  },
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              code: { type: "string", example: "VALIDATION_ERROR" },
              message: { type: "string", example: "Datos inválidos" },
              details: { type: "array", items: { type: "object", properties: { field: { type: "string" }, message: { type: "string" } } } }
            }
          }
        }
      },
      AlumnoInput: {
        type: "object",
        required: ["nombre", "apellido", "email", "legajo"],
        properties: {
          nombre: { type: "string", example: "Manuel" },
          apellido: { type: "string", example: "Grinspon" },
          email: { type: "string", example: "manuel@example.com" },
          legajo: { type: "string", example: "12345" }
        }
      },
      Alumno: {
        allOf: [
          { type: "object", properties: { id: { type: "integer", example: 1 } } },
          { $ref: "#/components/schemas/AlumnoInput" }
        ]
      },
      ProfesorInput: {
        type: "object",
        required: ["nombre", "email", "especialidad"],
        properties: {
          nombre: { type: "string", example: "Ana Gómez" },
          email: { type: "string", example: "ana@example.com" },
          especialidad: { type: "string", example: "Frontend" }
        }
      },
      Profesor: {
        allOf: [
          { type: "object", properties: { id: { type: "integer", example: 1 } } },
          { $ref: "#/components/schemas/ProfesorInput" }
        ]
      },
      CursoInput: {
        type: "object",
        required: ["nombre", "descripcion", "cupo_maximo", "profesorId"],
        properties: {
          nombre: { type: "string", example: "Node.js Avanzado" },
          descripcion: { type: "string", example: "API REST con Arquitectura Limpia" },
          cupo_maximo: { type: "integer", example: 30 },
          profesorId: { type: "integer", example: 1 }
        }
      },
      Curso: {
        allOf: [
          { type: "object", properties: { id: { type: "integer", example: 1 }, cupo_disponible: { type: "integer", example: 30 } } },
          { $ref: "#/components/schemas/CursoInput" }
        ]
      },
      InscripcionInput: {
        type: "object",
        required: ["alumnoId", "cursoId"],
        properties: {
          alumnoId: { type: "integer", example: 1 },
          cursoId: { type: "integer", example: 1 }
        }
      },
      Inscripcion: {
        allOf: [
          { type: "object", properties: { id: { type: "integer", example: 1 } } },
          { $ref: "#/components/schemas/InscripcionInput" }
        ]
      }
    }
  }
};

export default swaggerDoc;