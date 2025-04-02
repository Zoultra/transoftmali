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
    const user = localStorage.getItem('user');
    
    if (token) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        token,
        user: user ? JSON.parse(user) : null,
        isLoggedIn: true
      }));
    }
  }, []);

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
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
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
    localStorage.removeItem('user');  
    setAuth({ message: '', error: '', isLoggedIn: false, token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth,setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportation par défaut
export default AuthContext;
