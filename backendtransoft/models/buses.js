 // models/user.js
 import { DataTypes,Model  } from 'sequelize';
 import sequelize from '../config/database.js'; // Importation correcte de l'instance de sequelize
 import { nanoid } from 'nanoid';
 import Company from './company.js'; // Importez le modèle Company pour définir la relation
 
 class buses extends Model  {}

 buses.init({

    bus_id : {
         type: DataTypes.STRING, // Changez le type en STRING pour stocker l'ID généré
         primaryKey: true,
         allowNull: false,
         defaultValue: () => nanoid(), // Génération d'un ID unique
       },
    bus_number: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     validate: {
         notEmpty: { message: "Le numéro du bus ne peut pas être vide" },
       },
   },
   capacity: {
     type: DataTypes.INTEGER,
     allowNull: false,
     validate: {
         notEmpty: { message: "La capacité ne peut pas être vide" },
       },
   },
   company_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: "company",
      key: "company_id",
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
},
     
 
 {    sequelize,
     tableName: 'buses',  // Indique que la table s'appelle `buses`
     timestamps: true     // Sequelize ajoutera automatiquement `createdAt` et `updatedAt`
   }
  );

  buses.belongsTo(Company, { foreignKey: "company_id", as: "company" });
 
 // Exporter le modèle
 export default buses;
 