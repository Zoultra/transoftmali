// ProtectedPage.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedPage = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.token) {
    return <div>Accès refusé. Veuillez vous connecter.</div>;
  }

  return <div>Bienvenue dans votre espace sécurisé, {auth.user}!</div>;
};

export default ProtectedPage;
