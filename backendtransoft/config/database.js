import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d’environnement

// Utilisation de DATABASE_URL si disponible
 
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false, // Désactiver les logs SQL (optionnel)
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST, 
      port: process.env.DB_PORT || 5432, // Port PostgreSQL par défaut
      dialect: 'postgres',
      logging: false,
    });

// Fonction pour établir la connexion
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion PostgreSQL réussie !');
  } catch (error) {
    console.error('❌ Erreur de connexion :', error);
  }
};

// Synchroniser les modèles
sequelize.sync()
  .then(() => console.log('✅ Les tables sont synchronisées avec PostgreSQL'))
  .catch(error => console.error('❌ Erreur de synchronisation :', error));

export default sequelize;
