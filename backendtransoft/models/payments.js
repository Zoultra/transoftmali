 // models/user.js
 import { DataTypes } from 'sequelize';
 import sequelize from '../config/database.js'; // Importation correcte de l'instance de sequelize
 import { nanoid } from 'nanoid';

 const Payments = sequelize.define('Payments', {
    payment_id: {
         type: DataTypes.STRING, // Changez le type en STRING pour stocker l'ID généré
         primaryKey: true,
         allowNull: false,
         defaultValue: () => nanoid(), // Génération d'un ID unique
       },
    reservation_id: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "La reservation ne peut pas être vide" },
       },
   },
   amount: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le montant ne peut pas être vide" },
       },
   },
   payment_status: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le statut ne peut pas être vide" },
       },
   },
   
   
 },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7d51d18fc347c6dbeb8197de89f397909ca02309

 // Configurer la relation Many-to-One
//buses.belongsTo(Buses, {
  //  foreignKey: 'bus_id',
  //  as: 'bus_id ',
//}),
<<<<<<< HEAD
=======
=======
>>>>>>> 7d51d18fc347c6dbeb8197de89f397909ca02309
 
>>>>>>> 396e4c3f93be7ff3fe3db0942ea3a4f91bc1a8e3
 
 {
     tableName: 'payments',  // Indique que la table s'appelle `payments`
     timestamps: true     // Sequelize ajoutera automatiquement `createdAt` et `updatedAt`
   });
 
 // Exporter le modèle
 export default Payments;
 