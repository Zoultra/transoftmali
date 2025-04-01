 // syncDatabase.js
import sequelize from './database.js';
import '../models/associations.js'; // Chargez les associations

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Les tables ont été synchronisées avec succès !");
     // Synchroniser en respectant l'ordre des dépendances
     await Company.sync(); // D'abord la table parent
     await Route.sync(); // Ensuite la table enfant qui dépend de Companies
     await Reservations.sync(); // Créer la table parente en premier
     await Passenger.sync(); // Ensuite, créer la table qui dépend d'elle
     await sequelize.sync({ force: true });
    console.log("Les tables ont été synchronisées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error);
  }
};

syncDatabase();