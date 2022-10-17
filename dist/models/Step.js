"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Recipe_1 = require("./Recipe");
class Step extends sequelize_1.Model {
}
exports.Step = Step;
Step.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    recipe_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Recipe_1.Recipe,
            key: 'id',
        }
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'steps',
    timestamps: false,
});
