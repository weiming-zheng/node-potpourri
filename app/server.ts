import 'dotenv/config.js';

import express from 'express';
const app = express();

// static assets
import path from 'path';
app.use(express.static(path.join(import.meta.dirname, '..', 'public')));
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

import productsRouter from './routes/product.js'
app.use('/api/v1/products', productsRouter)

import notFound from './middlewares/not-found.js';
app.use(notFound)
import errorHandlerMiddleware from './middlewares/error-handler.js';
app.use(errorHandlerMiddleware)

import connectDB from './db/connet.js';
const port = process.env.SERVER_PORT || 8848

async function start() {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server is listening on port ${port} ... `);
        });
    } catch (error) {
        console.error(error)
    }
}

start()
