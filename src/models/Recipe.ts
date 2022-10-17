import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Course } from "./Course";
import { Season } from "./Season";
import { User } from "./User";

export class Recipe extends Model
{
    public id!: number;
    public name!: string;
    public slug!: string;
    public description?: string;
    public guests!: number;
    public course_id!: number;
    public season_id!: number;
    public user_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    guests: {
        type: DataTypes.INTEGER
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'id',
        }
    },
    season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Season,
            key: 'id',
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    }
},
{
    sequelize,
    tableName: 'recipes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});