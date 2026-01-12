import sequelize from './database.js';
import '../models/associations.js';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base réussie');

    await sequelize.sync({ alter: true }); // ✅ SAFE POUR PROD
    console.log('✅ Tables synchronisées avec succès');

  } catch (error) {
    console.error('❌ Erreur de synchronisation :', error);
  }
};

syncDatabase();
