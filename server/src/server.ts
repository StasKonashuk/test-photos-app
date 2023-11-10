import 'express-async-errors';

import cors from 'cors';
import express, { Application } from 'express';
import cookies from 'cookie-parser';

import initRoutes from './routes';

require('dotenv').config();

const app: Application = express();

const frontendUrl = process.env.FRONTEND_URL;

// setup CORS
app.use(
  cors({
    credentials: true,
    origin: [frontendUrl!],
    optionsSuccessStatus: 204,
  }),
);

app.use(cookies());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

export default app;
