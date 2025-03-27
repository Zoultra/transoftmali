// syncDatabase.js
import sequelize from './database.js';
import '../models/associations.js'; // Chargez les associations

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Les tables ont été synchronisées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error);
  }
};

syncDatabase();
