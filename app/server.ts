import 'dotenv/config.js';
import express from 'express';
const app = express();

import people from './routes/people.js';
import authenticateToken from './middleware/auth.js';

import path from 'path';
// static assets
app.use(express.static(path.join(import.meta.dirname, '..', 'public')));
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// jwt OAuth
app.use(authenticateToken);

// router
app.use('/api/people', people)

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}....`)
})
