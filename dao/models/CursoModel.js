import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../connection/index.js';

class CursosModel extends Model {}
CursosModel.init(
  {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cupo_maximo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cupo_disponible: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        profesorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Cursos',
        tableName: 'cursos',
        timestamps: false,
    }
);

export default CursosModel;