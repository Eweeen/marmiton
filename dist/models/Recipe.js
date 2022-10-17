"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Course_1 = require("./Course");
const Season_1 = require("./Season");
const User_1 = require("./User");
class Recipe extends sequelize_1.Model {
}
exports.Recipe = Recipe;
Recipe.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    guests: {
        type: sequelize_1.DataTypes.INTEGER
    },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course_1.Course,
            key: 'id',
        }
    },
    season_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Season_1.Season,
            key: 'id',
        }
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.User,
            key: 'id',
        }
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'recipes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
