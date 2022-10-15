"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = void 0;
const sequelize_1 = require("sequelize");
class Season extends sequelize_1.Model {
}
exports.Season = Season;
Season.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'seasons',
    timestamps: false
});
