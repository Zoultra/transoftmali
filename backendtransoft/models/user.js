 // models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importation correcte de l'instance de sequelize
import { nanoid } from 'nanoid';
const User = sequelize.define('User', {
  id: {
        type: DataTypes.STRING, // Changez le type en STRING pour stocker l'ID généré
        primaryKey: true,
        allowNull: false,
        defaultValue: () => nanoid(), // Génération d'un ID unique
      },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: { message: "Le nom ne peut pas être vide" },
      },
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: { message: "Le prénom ne peut pas être vide" },
      },
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: { message: "Le numéro de téléphone ne peut pas être vide" },
      },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: { message: "Le Mot de passe ne peut pas être vide" },
      },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le rôle ne peut pas être vide" },
      isIn: {
        args: [["admin", "manager", "client"]],
        msg: "Le rôle doit être 'admin', 'manager' ou 'client'",
      },
    },
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "actif",
    validate: {
      notEmpty: { msg: "Le statut ne peut pas être vide" },
      isIn: {
        args: [["actif", "inactif"]],
        msg: "Le statut doit être 'actif' ou 'inactif'",
      },
    },
  },
  
},

{
    tableName: 'users',  // Indique que la table s'appelle `users`
    timestamps: true     // Sequelize ajoutera automatiquement `createdAt` et `updatedAt`
  });

// Exporter le modèle
export default User;
