import AlumnosMemoryDao from "../alumnos/AlumnosMemoryDao.js";
import CursosMemoryDao from "../cursos/CursosMemoryDao.js";

class IncripcionesMemoryDao { 
    #inscripciones = [];
    #nextId = 1;
    #alumnosDao;
    #cursosDao;

    constructor(alumnosDao = AlumnosMemoryDao, cursosDao = CursosMemoryDao) {
        this.#alumnosDao = alumnosDao;
        this.#cursosDao = cursosDao;
    }

    async #withRelations(inscripcion) {
        const alumno = await this.#alumnosDao.getById(inscripcion.alumnoId);
        const curso = await this.#cursosDao.getById(inscripcion.cursoId);
        return {
            ...inscripcion,
            alumno: alumno || null,
            curso: curso || null
        };
    }

    async getAll({ alumnoId, cursoId } = {}) {
        const matches = (filter, value) => filter === undefined || [filter].flat().includes(value);
        const result = this.#inscripciones.filter(inscripcion =>
            matches(alumnoId, inscripcion.alumnoId) &&
            matches(cursoId, inscripcion.cursoId)
        );
        return Promise.all(result.map(inscripcion => this.#withRelations(inscripcion)));
    }

    async getById(id) {
        const numericId = Number(id);
        const inscripcion = this.#inscripciones.find(inscripcion => inscripcion.id === numericId);
        return inscripcion ? this.#withRelations(inscripcion) : null;
    }

    async getByAlumnoIdAndCursoId(alumnoId, cursoId) {
        const i = this.#inscripciones.find(x => x.alumnoId === alumnoId && x.cursoId === cursoId);
        return i ? { ...i } : null;
    }

   async save({ alumnoId, cursoId }) {
        const n = { id: this.#nextId++, alumnoId, cursoId };
        this.#inscripciones.push(n);
        return { ...n };
    }
   async delete(id) {
        const idx = this.#inscripciones.findIndex(x => x.id === Number(id));
        if (idx === -1) return null;
        return this.#inscripciones.splice(idx, 1)[0];
    }
}

export { IncripcionesMemoryDao };
export default new IncripcionesMemoryDao();