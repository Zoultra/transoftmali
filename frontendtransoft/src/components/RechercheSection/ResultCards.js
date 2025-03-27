import React from 'react';
import styles from "./ResultCards.module.css";
import { NavLink } from 'react-router-dom';

function ResultCard({ company, departure, arrival, date, departure_time, arrival_time, price }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6 w-96 max-w-sm sm:max-w-md lg:max-w-lg mx-auto px-auto transition-transform transform hover:scale-105">
      <h3 className={styles.companyName}>{company}</h3>

      <div className={styles.route}>
        <span>{departure}</span> 
        <span className={styles.arrow}>➝</span> 
        <span>{arrival}</span>
      </div>

      <div className={styles.schedule}>
        <p><strong>Date :</strong> {date}</p>
        <p><strong>Départ :</strong> {departure_time}</p>
        <p><strong>Arrivée :</strong> {arrival_time}</p>
      </div>

      <div className={styles.priceSection}>
        <p><strong>Prix :</strong> {price} FCFA</p>
        <NavLink
          to="/achat"
          state={{ company, departure, arrival, date, departure_time, arrival_time, price }}
          className={styles.reserveButton}
        >
          Réserver
        </NavLink>
      </div>
    </div>
  );
}

export default ResultCard;
