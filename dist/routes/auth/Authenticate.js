"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const AuthenticationController_1 = require("../../controllers/AuthenticationController");
const authController = new AuthenticationController_1.AuthenticationController();
exports.router = express_1.default.Router({
    strict: true
});
exports.router.route('/signin').post(authController.signin);
exports.router.route('/login').post(authController.login);
