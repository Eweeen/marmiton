import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Course } from "./Course";
import { Season } from "./Season";
import { User } from "./User";

export class Recipe extends Model
{
    declare id: number;
    declare name: string;
    declare slug: string;
    declare description: string;
    declare guests: number;
    declare course_id: number;
    declare season_id: number;
    declare user_id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
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
Recipe.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasOne(Recipe, { foreignKey: 'course_id' });

Recipe.belongsTo(Season, { foreignKey: 'season_id' });
Season.hasOne(Recipe, { foreignKey: 'season_id' });

Recipe.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Recipe, { foreignKey: 'user_id' });