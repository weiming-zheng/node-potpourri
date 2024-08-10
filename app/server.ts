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

import task from './routes/task.js';
app.use('/api/v1/tasks', task);

import notFound from './middleware/not-found.js';
app.use(notFound)

// custom error handler middleware should always be placed to the bottom of the middleware queue
// if there's no custome error handler being set, Express.js will add its own built-in default error handler instead
import errorHandlerMiddleware from './middleware/error-handler.js';
app.use(errorHandlerMiddleware)

import connectDB from './db/connect.js';

const port = process.env.SERVER_PORT || 8848;
async function start() {
    try {
        await connectDB();
        // if fail to connet DB, then there's no need to spin up server
        app.listen(port, () => {
            console.log(`Server is listening on port ${port} ... `);
        });
    } catch (error) {
        console.error(error);
    }
}

start();
