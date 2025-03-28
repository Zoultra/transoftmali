// syncDatabase.js
import sequelize from './database.js';
import '../models/associations.js'; // Chargez les associations

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Les tables ont été synchronisées avec succès !");
    await Company.sync(); // D'abord la table parent
    await Route.sync(); // Ensuite la table enfant qui dépend de Companies
    await Reservations.sync();  // D'abord, créer la table Reservations
    await Passenger.sync();  // Ensuite, créer la table Passenger qui y fait référence
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error);
  }
};

syncDatabase();
