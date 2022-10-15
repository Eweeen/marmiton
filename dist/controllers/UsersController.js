"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const CrudController_1 = require("./CrudController");
class UserController extends CrudController_1.CrudController {
    create(req, res) {
        throw new Error("Method create not implemented.");
    }
    ;
    async read(req, res) {
        const users = await User_1.User.findAll();
        res.json(users);
    }
    async show(req, res) {
        const user = await User_1.User.findOne({ where: { id: req.params.id } });
        res.json(user);
    }
    update(req, res) {
        throw new Error("Method update not implemented.");
    }
    ;
    delete(req, res) {
        throw new Error("Method delete not implemented.");
    }
    ;
}
exports.UserController = UserController;
