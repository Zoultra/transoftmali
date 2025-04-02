 // AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import UserService from '../Services/UserService';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ message: '',
    error: '',
    isLoggedIn: false,
    token: null,
    user: null, });

   
  const navigate = useNavigate();
  // Charger le token JWT du localStorage au montage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('user'); // Stocke le téléphone ou l'ID utilisateur
    
    if (token && isLoggedIn) {
      setAuth({ 
        message: '',
        error: '',
        isLoggedIn: true,
        token,
        user, // Remet l'utilisateur connecté
      });
    }
  }, []);  // ✅ Utiliser un tableau vide [] pour éviter les boucles infinies



  const login = async (telephone,password) => {
 

    const user = {telephone,password};
    UserService.loginUser(user)
    .then((response) => {
        setAuth({
            message: response.data.message,
            token: response.data.token,
            isLoggedIn: true,
            user: telephone,
            error: '',
          });
      const { token } = response.data;
      // Enregistrement du token dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      
    //  setActiveForm("reservation");
      navigate('/Accueil',  { state: { successMessage: "Bienvenue, vous êtes connecté !" } });
    })
    .catch((error) => {
      
        setAuth({
            message: '',
            error: error.response?.data?.message || 'Erreur inattendue',
          });
  });

  };


  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth,setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportation par défaut
export default AuthContext;
