import { Request, Response } from "express";
import { User } from "../models/User";
import { CrudController } from "./CrudController";

export class UserController extends CrudController
{
    create(req: Request, res: Response): void {
        throw new Error("Method create not implemented.");
    };

    public async read(req: Request, res: Response) {
        const users = await User.findAll();
        res.json(users);
    }

    public async show(req: Request, res: Response) {
        const user = await User.findOne({ where: { id: req.params.id } });
        res.json(user);
    }

    update(req: Request, res: Response): void {
        throw new Error("Method update not implemented.");
    };

    delete(req: Request, res: Response): void {
        throw new Error("Method delete not implemented.");
    };
}
