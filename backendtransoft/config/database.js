import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d’environnement

// Création de l'instance Sequelize
const sequelize = process.env.DATABASE_URL_PROD
  ? new Sequelize(process.env.DATABASE_URL_PROD, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Important pour Render
        },
      },
      logging: false, // Désactiver les logs SQL (optionnel)
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432, // Port PostgreSQL par défaut
      dialect: "postgres",
      logging: false,
    });

// Fonction pour établir la connexion et synchroniser les tables
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion PostgreSQL réussie !");
    
    // Synchroniser les modèles après la connexion
    await sequelize.sync();
    console.log("✅ Les tables sont synchronisées avec PostgreSQL");
  } catch (error) {
    console.error("❌ Erreur de connexion :", error);
  }
};

export default sequelize;
