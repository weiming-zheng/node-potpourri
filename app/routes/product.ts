import express from "express";
const productsRouter = express.Router()

import { getAllProducts, getAllProductsStatic } from "../controllers/product.js";

productsRouter.route('/').get(getAllProducts)
productsRouter.route('/static').get(getAllProductsStatic)

export default productsRouter