 // models/user.js
 import { DataTypes } from 'sequelize';
 import sequelize from '../config/database.js'; // Importation correcte de l'instance de sequelize
 import { nanoid } from 'nanoid';
 import Company from './company.js'; // Importez le modèle Company pour définir la relation
 const Route = sequelize.define('Route', {
    route_id: {
         type: DataTypes.STRING, // Changez le type en STRING pour stocker l'ID généré
         primaryKey: true,
         allowNull: false,
         defaultValue: () => nanoid(), // Génération d'un ID unique
       },
    departure_city: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "La ville de depart ne peut pas être vide" },
       },
   },
   arrival_city: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "La ville d'arrivée ne peut pas être vide" },
       },
   },
   departure_time: {
     type: DataTypes.TIME,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le numéro de téléphone ne peut pas être vide" },
       },
   },
   arrival_time: {
     type: DataTypes.TIME,
     allowNull: false,
     
   }, 
   routes_day: {
    type: DataTypes.DATE,
    allowNull: false,
    
  },
  company_id: {
    type: DataTypes.STRING,
    allowNull: false, // Assure qu'un trajet ne peut pas exister sans compagnie
    references: {
      model: "Companies",
      key: "company_id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT", // Empêche la suppression si la clé est utilisée
  },
   
   
 },

 // Configurer la relation Many-to-One
//buses.belongsTo(Buses, {
  //  foreignKey: 'bus_id',
  //  as: 'bus_id ',
//}),
 
 {
     tableName: 'routes',  // Indique que la table s'appelle `users`
     timestamps: true     // Sequelize ajoutera automatiquement `createdAt` et `updatedAt`
   });

   Route.belongsTo(Company, { foreignKey: "company_id", as: "company" });
 // Exporter le modèle
 export default Route;
 