import { Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";


const checkProductExists = (id: number): IProduct | undefined => {
    return market.find(product => product.id === id);
};


export const readMarket = (req: Request, res: Response) => {
    const total = market.reduce((sum, product) => sum + product.price, 0);
    
    const response = {
        total,
        products: market,
    }
    
    return res.status(200).json(response);
};


let id = 1;
export const createMarket =  (req: Request, res: Response) => {
    const {name, price, weight, section, calories} = req.body;
    const date = new Date()
    const gramsWeight = weight * 1000;
    date.setDate(date.getDate() + 365);

    const newProduct: IProduct = {
        id,
        name,
        price,
        weight: gramsWeight,
        section,
        calories: calories,
        expirationDate: date,
    };
    id++;

    market.push(newProduct);

    return res.status(201).json(newProduct);

};

export const readMarketById = (req: Request, res: Response) => {
    const { id } = req.params;

    const product = checkProductExists(Number(id));

    return res.status(200).json(product)
    
};

export const updatePartialMarket =  (req: Request, res: Response) => {
    const { id } = req.params;
    const product = checkProductExists(Number(id));

    if (!product) {
        return res.status(404).json({ message: "Product not found." });
    };
    Object.assign(product, req.body);

    return res.status(200).json(product);
};

export const deleteMarket = (req: Request, res: Response) => {
    const id = +req.params.id;
    const index = market.findIndex(product => product.id === id);

    market.splice(index, 1);

    return res.status(204).send();
};