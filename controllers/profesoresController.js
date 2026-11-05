import AppError from "../errors/AppError.js";

class ProfesoresController {
    #useCases;
    constructor(useCases) {
        this.#useCases = useCases;
    }

    list = async (req, res) => {
        const profesores = await this.#useCases.getProfesores(req.query);
        res.json(profesores);
    };

    get = async (req, res) => {
        const { id } = req.params;
        const profesor = await this.#useCases.getProfesorById(id);
        if (!profesor) {
            throw new AppError("Profesor no encontrado", 404);
        }
        res.json(profesor);
    };

    create = async (req, res) => {
        const data = req.body;
        const createdProfesor = await this.#useCases.createProfesor(data);
        res.status(201).json(createdProfesor);
    };

    update = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const updatedProfesor = await this.#useCases.updateProfesor(id, data);
        if (!updatedProfesor) {
            throw new AppError("Profesor no encontrado", 404);
        }
        res.json(updatedProfesor);
    };

    delete = async (req, res) => {
        const { id } = req.params;
        await this.#useCases.deleteProfesor(id);
        if (!id) {
            throw new AppError("Profesor no encontrado", 404);
        }
        res.status(204).send();
    };
}

export default ProfesoresController;