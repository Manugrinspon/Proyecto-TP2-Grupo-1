import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../connection/index.js';

class ProfesorModel extends Model {}

ProfesorModel.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Profesor',
        tableName: 'profesores',
        timestamps: false,
    }
);

export default ProfesorModel;