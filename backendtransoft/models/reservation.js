 // models/user.js
 import { DataTypes } from 'sequelize';
 import sequelize from '../config/database.js'; // Importation correcte de l'instance de sequelize
 import { nanoid } from 'nanoid';
 import User from "./user.js";
import Route from './routes.js';
 const Reservation = sequelize.define('Reservation', {
    reservation_id : {
         type: DataTypes.STRING, // Changez le type en STRING pour stocker l'ID généré
         primaryKey: true,
         allowNull: false,
         defaultValue: () => nanoid(), // Génération d'un ID unique
       },
       user_id: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "L'utilisateur ne peut pas être vide" },
       },
   },
   route_id : {
     type: DataTypes.INTEGER,
    type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le trajet ne peut pas être vide" },
       },
   },
   seats_reserved: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le nombre de place ne peut pas être vide" },
       },
   },
   status: {
    type: DataTypes.ENUM('En attente', 'Confirmée', 'Annulée'),
    allowNull: false,
    defaultValue: 'En attente',  // Par défaut, le statut est "pending"
    validate: {
        notEmpty: { message: "Le statut ne peut pas être vide" },
      },
  },
   
   
 },

  
 
 {
     tableName: 'reservations',  // Indique que la table s'appelle `users`
     timestamps: true     // Sequelize ajoutera automatiquement `createdAt` et `updatedAt`
   });

   // ✅ Définition de la relation
   Reservation.belongsTo(User, { foreignKey: "user_id", as: "user" });
   Reservation.belongsTo(Route, { foreignKey: "route_id", as: "route" });
   
 // Exporter le modèle
 export default Reservation;
 