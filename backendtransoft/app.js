// app.js
import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import cors from 'cors'; // Importation de CORS
import jwt from 'jsonwebtoken';

import userRoutes from './routes/userRoutes.js';
import routesRoutes from './routes/routesRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import busesRoutes from './routes/busesRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
dotenv.config();

const app = express();
app.use(cors()); // Utiliser CORS comme middleware
// Middleware pour traiter les données JSON
app.use(json());
connectDB(); // Connexion à la base de données
// Utiliser les routes
app.use('/api-transoft', userRoutes);
app.use('/api-transoft', routesRoutes);
app.use('/api-transoft', companyRoutes);
app.use('/api-transoft', busesRoutes);
app.use('/api-transoft', reservationRoutes);
// Appeler la fonction de synchronisation

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
