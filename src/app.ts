import express from "express";
import { createMarket, deleteMarket, readMarket, readMarketById, updatePartialMarket } from "./logic";
import { checkIdExists, checkNameExists } from "./middlewares";

const app = express();

app.use(express.json());

//Listar todos os produtos do mercado
app.get("/products", readMarket);

// Criar e adicionar o produto ao mercado
app.post("/products", checkNameExists, createMarket);

// Listar um produto específico através do seu id
app.get("/products/:id", checkIdExists, readMarketById)

//	Atualizar os dados de um produto através do seu id
app.patch("/products/:id", checkNameExists, checkIdExists, updatePartialMarket)

//	Deletar o produto a partir do seu id
app.delete("/products/:id", checkIdExists, deleteMarket)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});