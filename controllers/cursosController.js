import AppError from "../errors/AppError.js";

class CursosController {
    #useCases;

    constructor(useCases) {
        this.#useCases = useCases;
    }

    list = async (req, res) => {
        const cursos = await this.#useCases.getCursos(req.query);
        res.json(cursos);
    };

    get = async (req, res) => {
        const { id } = req.params;
        const curso = await this.#useCases.getCursoById(id);
        if (!curso) {
            throw new AppError("Curso no encontrado", 404);
        }
        res.json(curso);
    };

    create = async (req, res) => {
        const data = req.body;
        const createdCurso = await this.#useCases.createCurso(data);
        res.status(201).json(createdCurso);
    };

    update = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const updatedCurso = await this.#useCases.updateCurso(id, data);
        if (!updatedCurso) {
            throw new AppError("Curso no encontrado", 404);
        }
        res.json(updatedCurso);
    };

    delete = async (req, res) => {
        const { id } = req.params;
        await this.#useCases.deleteCurso(id);
        if (!id) {
            throw new AppError("Curso no encontrado", 404);
        }
        res.status(204).send();
    };
}

export default CursosController;