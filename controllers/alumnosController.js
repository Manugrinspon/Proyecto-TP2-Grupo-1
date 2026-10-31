import AppError from "../errors/AppError.js";

class AlumnosController {

    #useCases;

    constructor(useCases) {
        this.#useCases = useCases;
    }

    listAlumnos = async (req, res) => {
        const alumnos = await this.#useCases.getAlumnos(req.query);
        res.json(alumnos);
    };

    get = async (req, res) => {
        const { id } = req.params;
        const alumno = await this.#useCases.getAlumnoById(id);
        if (!alumno) {
            throw new AppError("Alumno no encontrado", 404);
        }
        res.json(alumno);
    };

    create = async (req, res) => {
        const data = req.body;
        const createdAlumno = await this.#useCases.createAlumno(data);
        res.status(201).json(createdAlumno);
    };

    update = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const updatedAlumno = await this.#useCases.updateAlumno(id, data);
        if (!updatedAlumno) {
            throw new AppError("Alumno no encontrado", 404);
        }
        res.json(updatedAlumno);
    };

    delete = async (req, res) => {
        const { id } = req.params;
        await this.#useCases.deleteAlumno(id);
        if (!id) {
            throw new AppError("Alumno no encontrado", 404);
        }
        res.status(204).send();
    };
}

export default AlumnosController;