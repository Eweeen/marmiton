import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Season extends Model
{
    id!: number;
    name!: string;
}

Season.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    tableName: 'seasons',
    timestamps: false
});