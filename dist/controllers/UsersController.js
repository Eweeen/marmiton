"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Permission_1 = require("../models/Permission");
const User_1 = require("../models/User");
const CrudController_1 = require("./CrudController");
class UserController extends CrudController_1.CrudController {
    create(req, res) {
        throw new Error("Method create not implemented.");
    }
    ;
    read(req, res) {
        User_1.User.findAll()
            .then(users => res.json(users))
            .catch(error => {
            console.log(error);
            res.json({ message: "Cannot read user" });
        });
    }
    show(req, res) {
        User_1.User.findOne({
            where: { id: req.params.id },
            include: { model: Permission_1.Permission, as: 'permission' }
        })
            .then(user => res.json(user))
            .catch(error => {
            console.log(error);
            res.json({ message: `Cannot find user with id ${req.params.id}` });
        });
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
