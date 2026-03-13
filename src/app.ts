import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// CONFIGURACIÓN DE CORS MEJORADA
app.use(cors({
  origin: '*', // Permite que Vercel se conecte sin problemas
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Clinica Aleli API is running' });
});

// Error handling
app.use(errorHandler);

export default app;
