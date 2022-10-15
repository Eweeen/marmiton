import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Permission } from "./Permission";

export class User extends Model
{
    public id!: number;
    public lastname!: string;
    public firstname!: string;
    public mail!: string;
    public password!: string;
    public permission_id!: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Permission,
            key: 'id'
        }
    }
},
{
    sequelize,
    tableName: 'users',
    timestamps: false
})