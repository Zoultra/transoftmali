 // models/user.js
 import { DataTypes,Model } from 'sequelize';
 import sequelize from '../config/database.js'; // Importation correcte de l'instance de sequelize
 import { nanoid } from 'nanoid';
  
 
 class Company extends Model {}

 Company.init({
    company_id: {
         type: DataTypes.STRING, // Changez le type en STRING pour stocker l'ID généré
         primaryKey: true,
         allowNull: false,
         defaultValue: () => nanoid(), // Génération d'un ID unique
       },
    company_name: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le nom ne peut pas être vide" },
       },
   },
   address: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "L'adresse ne peut pas être vide" },
       },
   },
   phone: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le numéro de téléphone ne peut pas être vide" },
       },
   },
   
   
 },

   
 
 {   sequelize,
     tableName: 'company',  // Indique que la table s'appelle `users`
     timestamps: true     // Sequelize ajoutera automatiquement `createdAt` et `updatedAt`
   });
 
 // Exporter le modèle
 export default Company;
 