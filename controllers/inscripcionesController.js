import AppError from "../errors/AppError.js";

class InscripcionesController {
    #useCases;

    constructor(useCases) {
        this.#useCases = useCases;
    }

    list = async (req, res) => {
        const inscripciones = await this.#useCases.getInscripciones(req.query);
        res.json(inscripciones);
    };

    get = async (req, res) => {
        const { id } = req.params;
        const inscripcion = await this.#useCases.getInscripcionById(id);
        if (!inscripcion) {
            throw new AppError("NOT_FOUND", "Inscripción no encontrada", 404);
        }
        res.json(inscripcion);
    };

    create = async (req, res) => {
        const data = req.body;
        const createdInscripcion = await this.#useCases.createInscripcion(data);
        res.status(201).json(createdInscripcion);
    };

    delete = async (req, res) => {
        const { id } = req.params;
        await this.#useCases.deleteInscripcion(id);
        if (!id) {
            throw new AppError("NOT_FOUND", "Inscripción no encontrada", 404);
        }
        res.status(204).send();
    };
}

export default InscripcionesController;