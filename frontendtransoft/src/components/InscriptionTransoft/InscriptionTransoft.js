import React, {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InscriptionTransoft.module.css";
import UserService from '../Services/UserService';
import { AuthContext, } from '../Security/AuthContext';
import { NavLink } from 'react-router-dom';
 
const InscriptionTransoft = () => {
  const [activeForm, setActiveForm] = useState("connexion");
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');  // État pour gérer le message de succès ou d'erreur
  const [error, setError] = useState('');
  const [telephone, setTelephone] = useState('');
  const [role, setRole] = useState('client');
  const { login,auth } = useContext(AuthContext);
  
  const saveUser = (e) => {
    e.preventDefault();
    setMessage(''); 
    setError('');
    const user = { nom,prenom,telephone,password,email,role};
    UserService.createUser(user)
    .then((response) => {
      setMessage(response.data.message);
    setActiveForm("connexion");
     //  navigate("/home");
    })
    .catch((error) => {
     
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);  // Affiche le message du serveur
      } 
      else {
        setError('Erreur inattendue.');
      }
  });
};

 

  const connecter = async (e) => {
    e.preventDefault();
   
    await login(telephone, password);
  }
 

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
            <NavLink styles='color: white;' to="/accueil">
              <img
                src="img/TranSoftLogo.png"
                alt="Logo"
                width="65px"
                height="45px"
              />
              TRANSOFT
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {activeForm === "signup" && (
          <div className={styles.formContainer}>
            <h2>Inscription</h2>
      {/* Affiche le message d'erreur */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={saveUser}>
              <div className={styles.formGroup}>
                <label htmlFor="signup-name">Nom </label>
                <input type="text" id="signup-name"  value={nom} onChange={(e) => setNom(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="signup-name">Prénom</label>
                <input type="text" id="signup-name"  value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="signup-name">Téléphone</label>
                <input type="text" id="signup-name"  value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="signup-email">Email</label>
                <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="signup-password">Mot de passe</label>
                <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className={styles.btn}>S'inscrire</button>
            </form>
            <div className={styles.toggleForm}>
              <a href="#" onClick={() => setActiveForm("connexion")}>
                Déjà inscrit ? Connectez-vous
              </a>
            </div>
          </div>
        )}

        {activeForm === "connexion" && (
          <div className={styles.formContainer}>
            <h2>Connexion</h2>
            {auth?.message && <p className={styles.alert}>{auth?.message}</p>}
            {auth?.error && <p className={styles.alerterror}>{auth?.error}</p>}
             
            <form onSubmit={connecter}>
              <div className={styles.formGroup}>
                <label htmlFor="login-email">Téléphone</label>
                <input type="text" id="login-telephone" name="telephone"  onChange={(e) => setTelephone(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="login-password">Mot de passe</label>
                <input type="password" id="login-password" name="password" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className={styles.btn}>Se connecter</button>
            </form>
            <div className={styles.toggleForm}>
              <a href="#" onClick={() => setActiveForm("signup")}>
                Pas encore de compte ? Inscrivez-vous
              </a>
            </div>
            <div className={styles.toggleForm}>
              <a href="http://localhost:5173/login" target="_blank" rel="noopener noreferrer" >
           
              ACCÈS RESTREINT
 
              </a>
            </div>
          </div>
        )}

        
      </main>

    </div>
       
  );
};

export default InscriptionTransoft;






