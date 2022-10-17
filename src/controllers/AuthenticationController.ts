import { Request, Response } from "express";
import { generateToken } from "../authentication/jwt";
import { Permission } from "../models/Permission";
import { User } from "../models/User";
import { CrudController } from "./CrudController";
import { hash, compare } from 'bcrypt';
import { BCRYPT_ROUND } from "../config/constants";
import status from 'http-status';

export class AuthenticationController extends CrudController
{
    public async signin(req: Request, res: Response): Promise<void> {
        let user = req.body;
        hash(user.password, BCRYPT_ROUND)
        .then(hashPass => {
            user.password = hashPass;

            User.create(user, { fields: ['firstname', 'lastname', 'password', 'mail'] })
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
    };

    public async login(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({
            where: { mail: req.body.mail },
            include: {
                model: Permission,
                as: 'permission'
            }
        });

        if (user) {
            if (await compare(req.body.password, user.password)) {
                const token = generateToken(user);
                res.json({ token: token });
            } else {
                res.status(status.UNAUTHORIZED).json({ message: "Email or password incorrect" });
            }
        } else {
            res.status(status.UNAUTHORIZED).json({ message: "Email or password incorrect" });
        }
    }
}