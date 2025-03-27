import React, { useState, useEffect } from "react";
import styles from "./Accueil.module.css"
import { useLocation } from 'react-router-dom';

function Accueil() {
  const location = useLocation();
  const successMessage = location.state?.successMessage || '';
  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    // Vérifier l'état de connexion dans localStorage
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setShowAlert(true);
      // Supprimer l'état de connexion pour que l'alerte ne réapparaisse pas
      
      localStorage.removeItem('isLoggedIn');
    }
  }, []);

  return (
      <section className={styles.hero}  id="accueil">
        <div className="container">
          <div className={styles.heroContent}>
          {successMessage && (
         <div style={{marginTop: '-20px',margin: '0 auto',textAlign: 'center', width: '600px',marginBottom: '100px', padding: '10px', backgroundColor: 'lightgreen', color: 'green', borderRadius: '5px' }}>
        {successMessage}
       </div> )}
            <h1 className={styles.heroTitle}>
              Voyagez en toute simplicité avec TRANSOFT
            </h1>
            <p>
              Réservez vos billets d'autocar en quelques clics auprès des
              meilleures compagnies de transport
            </p>
            <a href="#companies" className={styles.btn}>
              Voir nos compagnies partenaires
            </a>
          </div>
        </div>
      </section>
    
  );
}

export default Accueil;
