import { Request, Response } from "express";
import { generateToken } from "../authentication/jwt";
import { User } from "../models/User";
import { CrudController } from "./CrudController";

export class UserController extends CrudController
{
    public create(req: Request, res: Response): void {
        throw new Error("Method create not implemented.");
    };

    public read(req: Request, res: Response): void {
        User.findAll()
        .then(users => res.json(users))
        .catch(error => {
            console.log(error);
            res.json({ message: "Cannot read user" });
        });
    }

    public show(req: Request, res: Response): void {
        User.findOne({ where: { id: req.params.id } })
        .then(user => res.json(user))
        .catch(error => {
            console.log(error);
            res.json({ message: `Cannot find user with id ${req.params.id}` });
        });
    }

    update(req: Request, res: Response): void {
        throw new Error("Method update not implemented.");
    };

    delete(req: Request, res: Response): void {
        throw new Error("Method delete not implemented.");
    };
}
