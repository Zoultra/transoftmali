 // models/user.js
 import { DataTypes } from 'sequelize';
 import sequelize from '../config/database.js'; // Importation correcte de l'instance de sequelize
 import { nanoid } from 'nanoid';
 import Reservation from './reservation.js'; // Importez le modèle Company pour définir la relation

 const Passenger = sequelize.define('Passenger', {
    passenger_id: {
         type: DataTypes.STRING, // Changez le type en STRING pour stocker l'ID généré
         primaryKey: true,
         allowNull: false,
         defaultValue: () => nanoid(), // Génération d'un ID unique
       },
    firstname: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "La Prenom de depart ne peut pas être vide" },
       },
   },
    lastname: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
         notEmpty: { message: "Le nom d'arrivée ne peut pas être vide" },
       },
   },
   phone: {
<<<<<<< HEAD
<<<<<<< HEAD
     type: DataTypes.NUMBER,
=======
=======
     type: DataTypes.NUMBER,
>>>>>>> 7d51d18fc347c6dbeb8197de89f397909ca02309
     type: DataTypes.STRING,
>>>>>>> 396e4c3f93be7ff3fe3db0942ea3a4f91bc1a8e3
     allowNull: false,
     validate: {
         notEmpty: { message: "Le numéro de téléphone ne peut pas être vide" },
       },
   },
   reservation_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: 'reservations',
        key: 'reservation_id'
    }
}
   
   
 },
 
 
 {
     tableName: 'passenger',  // Indique que la table s'appelle `passenger`
     timestamps: true     // Sequelize ajoutera automatiquement `createdAt` et `updatedAt`
   });

   
   Reservation.hasMany(Passenger, { foreignKey: "reservation_id", as: "passengers" }); 
   Passenger.belongsTo(Reservation, { foreignKey: "reservation_id", as: "reservation" }); 

 export default Passenger;
 