// syncDatabase.js
import sequelize from './database.js';
import '../models/associations.js'; // Chargez les associations

const syncDatabase = async () => {
  try {
<<<<<<< HEAD
    await sequelize.sync({ alter: true });
    console.log("Les tables ont été synchronisées avec succès !");
     // Synchroniser en respectant l'ordre des dépendances
     await Company.sync(); // D'abord la table parent
     await Route.sync(); // Ensuite la table enfant qui dépend de Companies
=======
    await sequelize.sync({ force: true });
    console.log("Les tables ont été synchronisées avec succès !");
    await Company.sync(); // D'abord la table parent
    await Route.sync(); // Ensuite la table enfant qui dépend de Companies
>>>>>>> 396e4c3f93be7ff3fe3db0942ea3a4f91bc1a8e3
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error);
  }
};

syncDatabase();
