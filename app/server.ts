import 'dotenv/config.js';
const port = process.env.SERVER_PORT;

import express from 'express';
const app = express();

// static assets
import path from 'path';
app.use(express.static(path.join(import.meta.dirname, '..', 'public')));
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.all('*', (req, res) => {
    res.status(404).send('resource not found')
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port} ... `);
});
