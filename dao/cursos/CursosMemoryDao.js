class CursosMemoryDao {
    #cursos;
    #nextId;

    constructor(initialCursos = [
        { id: 1, nombre: 'Node.js Avanzado', descripcion: 'API REST con Clean Architecture', cupo_maximo: 30, cupo_disponible: 30, profesorId: 1 },
        { id: 2, nombre: 'React Intermedio', descripcion: 'Hooks y Context', cupo_maximo: 25, cupo_disponible: 25, profesorId: 2 },
    ]) {
        this.#cursos = [...initialCursos];
        this.#updateNextId();
    }

    #updateNextId() {
        const maxId = this.#cursos.reduce((max, curso) => Math.max(max, curso.id), 0);
        this.#nextId = maxId + 1;
    }

    async getAll({ nombre, profesorId, sort, page = 1, limit } = {}) {
        let cursos = this.#cursos.filter(curso => {
            if (nombre && !curso.nombre.toLowerCase().includes(nombre.toLowerCase())) return false;
            if (profesorId && curso.profesorId !== Number(profesorId)) return false;
            return true;
        });

if (sort) {
            cursos.sort((a, b) => {
                if (sort === 'nombre') return a.nombre.localeCompare(b.nombre);
                if (sort === 'cupo_disponible') return a.cupo_disponible - b.cupo_disponible;
                return 0;
            });
        }

        if (limit !== undefined) {
            const parsedLimit = parseInt(limit, 10);
            const parsedPage = parseInt(page, 10) || 1;
            const startIndex = (parsedPage - 1) * parsedLimit;
            cursos = cursos.slice(startIndex, startIndex + parsedLimit);
        }

        return cursos.map((curso) => ({ ...curso }));
}

    async getById(id) {
        const numericId = Number(id);
        const curso = this.#cursos.find(curso => curso.id === numericId);
        return curso ? { ...curso } : null;
    }

    async save(data) {
        const { id: _ignored, ...cursoData } = data;
        const cupoDisponible = cursoData.cupo_disponible !== undefined ? cursoData.cupo_disponible : cursoData.cupo_maximo;
        
        const newCurso = { id: this.#nextId, ...cursoData, cupo_disponible: cupoDisponible };
        this.#cursos.push(newCurso);
        this.#nextId++;
        return { ...newCurso };
    }

    async update(id, data) {
        const numericId = Number(id);
        const index = this.#cursos.findIndex(curso => curso.id === numericId);
        if (index === -1) return null;
        const { id: _ignored, ...updatedData } = data;
        this.#cursos[index] = { ...this.#cursos[index], ...updatedData };
        return { ...this.#cursos[index] };
    }

    async delete(id) {
        const numericId = Number(id);
        const index = this.#cursos.findIndex(curso => curso.id === numericId);
        if (index === -1) return null;
        const deletedCurso = this.#cursos.splice(index, 1)[0];
        return { ...deletedCurso };
    }
}

export { CursosMemoryDao };
export default new CursosMemoryDao();