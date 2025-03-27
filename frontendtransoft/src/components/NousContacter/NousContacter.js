import React from "react";
import styles from "./NousContacter.module.css"; // Import du fichier CSS Module

const NousContacter = () => {
  return (
    <div className={styles.containerContact}>
      <h1 className={styles.title}>Nous contacter</h1>
      <p className={styles.description}>
        Pour toute question ou assistance, vous pouvez nous contacter via :
      </p>
      <div className={styles.contactInfo}>
        <p>
          <strong>Email :</strong>{" "}
          <a href="mailto:support@transoft.com" className={styles.link}>
            support@transoft.com
          </a>
        </p>
        <p>
          <strong>Téléphone :</strong> +223 00 00 00 00
        </p>
        <p>
          <strong>Adresse :</strong> Rue 123, Bamako, Mali
        </p>
      </div>
      <footer className={styles.footerContact}>
        <p>&copy; 2025 TRANSOFT. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default NousContacter;
