<<<<<<< HEAD
=======
 {/* ✅ Bouton Supprimer 
>>>>>>> 396e4c3f93be7ff3fe3db0942ea3a4f91bc1a8e3
// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

<<<<<<< HEAD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,process.env.DATABASE_URL, {
=======
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
>>>>>>> 396e4c3f93be7ff3fe3db0942ea3a4f91bc1a8e3
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
<<<<<<< HEAD
=======

*/}

//PROD CONFIG

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d’environnement

// Utilisation de DATABASE_URL si disponible
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      logging: false, // Désactiver les logs SQL (optionnel)
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST, // Utiliser DB_HOST si pas d’URL complète
      dialect: 'mysql',
      logging: false,
    });

// Fonction pour établir la connexion
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion MySQL réussie !');
  } catch (error) {
    console.error('❌ Erreur de connexion :', error);
  }
};

// Synchroniser les modèles
sequelize.sync()
  .then(() => console.log('✅ Les tables sont synchronisées'))
  .catch(error => console.error('❌ Erreur de synchronisation :', error));

// Exporter l'instance Sequelize
export default sequelize;

>>>>>>> 396e4c3f93be7ff3fe3db0942ea3a4f91bc1a8e3
