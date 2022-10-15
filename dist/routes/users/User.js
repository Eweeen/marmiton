"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../../controllers/UsersController");
const recipeController = new UsersController_1.UserController();
exports.router = express_1.default.Router({
    strict: true
});
exports.router.route('/users').get(recipeController.read);
exports.router.route('/user/:id').get(recipeController.show);
