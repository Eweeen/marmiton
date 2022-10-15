import { Request, Response } from "express";
import { Recipe } from "../models/Recipe";
import { CrudController } from "./CrudController";

export class RecipeController extends CrudController
{
    create(req: Request, res: Response): void {
        throw new Error("Method create not implemented.");
    };

    public async read(req: Request, res: Response): Promise<void> {
        const recipe = await Recipe.findAll();
        res.json(recipe);
    }

    public show(req: Request, res: Response): void {
        Recipe.findOne({ where: { id: req.params.id } })
            .then(recipe => res.json(recipe))
            .catch(error => console.log(error));
    }

    update(req: Request, res: Response): void {
        throw new Error("Method update not implemented.");
    };

    delete(req: Request, res: Response): void {
        throw new Error("Method delete not implemented.");
    };
}
