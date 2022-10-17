"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const jwt_1 = require("../authentication/jwt");
const Permission_1 = require("../models/Permission");
const User_1 = require("../models/User");
const CrudController_1 = require("./CrudController");
const bcrypt_1 = require("bcrypt");
const constants_1 = require("../config/constants");
const http_status_1 = __importDefault(require("http-status"));
class AuthenticationController extends CrudController_1.CrudController {
    async signin(req, res) {
        let user = req.body;
        (0, bcrypt_1.hash)(user.password, constants_1.BCRYPT_ROUND)
            .then(hashPass => {
            user.password = hashPass;
            User_1.User.create(user, { fields: ['firstname', 'lastname', 'password', 'mail'] })
                .then(() => res.json("User create successful"))
                .catch(error => {
                console.log(error);
                res.json({ message: "Cannot create user" });
            });
        })
            .catch(error => {
            console.log(error);
            res.json({ message: "Cannot create user" });
        });
    }
    ;
    async login(req, res) {
        const user = await User_1.User.findOne({
            where: { mail: req.body.mail },
            include: {
                model: Permission_1.Permission,
                as: 'permission'
            }
        });
        if (user) {
            if (await (0, bcrypt_1.compare)(req.body.password, user.password)) {
                const token = (0, jwt_1.generateToken)(user);
                res.json({ token: token });
            }
            else {
                res.status(http_status_1.default.UNAUTHORIZED).json({ message: "Email or password incorrect" });
            }
        }
        else {
            res.status(http_status_1.default.UNAUTHORIZED).json({ message: "Email or password incorrect" });
        }
    }
}
exports.AuthenticationController = AuthenticationController;
