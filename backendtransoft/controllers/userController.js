// controllers/userController.js
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
 
  try {
    const { password, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...userData, password: hashedPassword });
    
    res.status(201).json({ message: 'Votre compte a été créé', user: user });
  } catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Cet email est déjà utilisé. Veuillez en choisir un autre.' });
    } else {
      res.status(500).json({ message: 'Erreur du serveur', error });
    }
    
    
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
   // Authentification des utilisateurs

export const loginUser = async (req, res) => {
  const { telephone, password } = req.body;
  try {
    const user = await User.findOne({ where: { telephone } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Generate a JWT token
    const token = jwt.sign({ idUser: user.id, telephone }, process.env.TOKEN_KEY, { expiresIn: '120s' });
    user.token = token
    res.status(200).json({ message: 'Connexion réussie', user, token });
    console.log(token)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};