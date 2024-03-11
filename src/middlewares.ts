import { market } from "./database";
import { NextFunction, Request, Response } from "express";


export const checkNameExists = ( req: Request, res: Response, next: NextFunction ) => {
    const { name} = req.body;

    const existingProduct = market.find(product => product.name === name);

    if(existingProduct) {
        return res.status(409).json({ message:  "Product already registered." })
    };

    return next();
}

export const checkIdExists = ( req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const idNumber = Number(id);

    if (isNaN(idNumber) || idNumber <= 0)  {
        return res.status(400).json({ message: "Invalid product ID." });
    }
    const existingProduct = market.find(product => product.id === idNumber);

    if(!existingProduct) {
        return res.status(404).json({message: "Product not found."})
    };

    return next();
};