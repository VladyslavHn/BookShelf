import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";

import { env } from './utils/env.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
    const app = express();

app.use(cors());

app.use(express.json());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});

app.use('*', (req, res, next) => {
    res(404).json({
        message: "Route not found",
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Something went wrong",
        error: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

};
