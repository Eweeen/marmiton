import { Request, Response } from "express";
import { Recipe } from "../models/Recipe";
import { CrudController } from "./CrudController";

export class RecipeController extends CrudController
{
    public create(req: Request, res: Response): void {
        const regex: RegExp = /^[\w\s]+$/;
        const result = regex.test(req.body.name);
        if (result) {
            Recipe.create(req.body)
            .then(recipe => res.json(recipe))
            .catch(error => {
                console.log(error);
                res.json({ message: "Insertion impossible" });
            });
        }
        res.send("Name accept only alphanumeric catacters.");
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

    public update(req: Request, res: Response): void {
        Recipe.findOne({ where: { id: req.params.id } })
        .then(recipe => {
            if (recipe) {
                recipe.set(req.body);
                recipe.save();
                res.json(recipe);
            } else {
                res.json({ message: `No recipe with id ${req.params.id}` });
            }
        })
        .catch(error => {
            console.log(error);
            res.json({ message: "Update failed" });
        });
    };

    delete(req: Request, res: Response): void {
        throw new Error("Method delete not implemented.");
    };
}
