import { Op, literal } from "sequelize";
import { sequelize, InscripcionModel, AlumnoModel, CursoModel } from "../models/index.js";

const INSCRIPCIONES_ATTRIBUTES = ["id", "alumnoId", "cursoId"];

const INCLUDE = [
    {model: AlumnoModel, as: "alumno", attributes: ["id", "nombre", "apellido", "email", "legajo"]},
    {model: CursoModel, as: "curso", attributes: ["id", "nombre", "descripcion", "cupo_maximo", "cupo_disponible", "profesorId"]},
];

class InscripcionesSequelizeDao {

    async getAll({ alumnoId, cursoId } = {}) {
        const where = {};
        if (alumnoId) where.alumnoId = alumnoId;
        if (cursoId) where.cursoId = cursoId;
        const inscripciones = await InscripcionModel.findAll({
            where,
            attributes: INSCRIPCIONES_ATTRIBUTES,
            include: INCLUDE,
        });
        return inscripciones.map(inscripcion => inscripcion.get({ plain: true }));
    }

    async getById(id) {
        const inscripcion = await InscripcionModel.findByPk(id, {
            attributes: INSCRIPCIONES_ATTRIBUTES,
            include: INCLUDE,
        });
        return inscripcion ? inscripcion.get({ plain: true }) : null;
    }

    async save(data) {
        const { id: _ignored, ...inscripcionData } = data;
        const newInscripcion = await InscripcionModel.create(inscripcionData);
        return newInscripcion.get({ plain: true });
    }

    async delete(id) {
        const deletedRowsCount = await InscripcionModel.destroy({
            where: { id },
        });
        return deletedRowsCount > 0;
    }

}

export { InscripcionesSequelizeDao };
export default new InscripcionesSequelizeDao();