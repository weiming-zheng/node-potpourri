import "dotenv/config.js";
import jwt from 'jsonwebtoken';
import { people } from './models/data.js';
import express from 'express';
import authenticateToken from "./middleware/auth.js";
const app = express();

app.use(express.json());

// authServer in general handles login (token creation), logout (token deletion) and token refresh

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '15m' });
}

const refreshTokens = new Map<string | number, string>();

app.post('/login', (req, res) => {
    const { user } = req.body;
    // Authenticate user first, if passed
    if (!user) res.status(401).send('Please Provide Credentials');
    const accessToken = generateAccessToken(user);

    let refreshToken : string;
    if (refreshTokens.has(user.id)) {
        refreshToken = refreshTokens.get(user.id)
    } else {
        refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.set(user.id, refreshToken);
    }

    return res.json({ accessToken, refreshToken, user });
})

app.post('/token', (req, res) => {
    const { user } = req.body;
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.has(user.id)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ user })
        return res.json({ accessToken });
    })
})

app.delete('/logout', (req, res) => {
    const { user } = req.body;
    refreshTokens.delete(user.id);
    res.sendStatus(204);
})

const AUTH_SERVER_PORT = process.env.AUTH_SERVER_PORT;
app.listen(AUTH_SERVER_PORT, () => {
    console.log(`Auth Server is listening on port ${AUTH_SERVER_PORT}`);
});
