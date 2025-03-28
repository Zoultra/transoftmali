// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,process.env.DATABASE_URL, {
  host: 'localhost',
  dialect: 'mysql',
});

// Fonction pour établir la connexion
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('La connexion à la base de données a été établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
};

// Synchroniser les modèles
sequelize.sync()
    .then(() => {
        console.log('Les tables ont été synchronisées avec succès.');
    })
    .catch(error => {
        console.error('Erreur de synchronisation:', error);
    });

    

// Exporter l'instance de sequelize
export default sequelize; 
