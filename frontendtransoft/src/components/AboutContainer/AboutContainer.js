import React from "react";
import styles from "./AboutContainer.module.css"; // Import du fichier CSS Module

const AboutContainer = () => {
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.title}>À propos de TRANSOFT</h2>
      <p>
        <span className={styles.highlight}>TRANSOFT</span> est une plateforme
        innovante qui révolutionne la réservation de billets de voyage en
        autocar à travers le Mali. Nous collaborons avec un vaste réseau de
        compagnies de transport pour offrir une solution moderne et efficace à
        la gestion des réservations. 
         Notre mission est de{" "}
        <span className={styles.highlight}>simplifier la gestion des voyages</span> pour les passagers tout en offrant aux compagnies une{" "}
        <span className={styles.highlight}>opportunité unique</span> d’accroître leur visibilité, d’améliorer leur productivité et de garantir un service client exceptionnel.
      </p>

      <div className={styles.benefits}>
        <div className={styles.benefitItem}>
          <h3>1. Augmentez votre visibilité et vos ventes</h3>
          <p>
            Grâce à notre plateforme, votre compagnie bénéficiera d’une
            visibilité accrue auprès d’un public plus large. Nos outils de
            promotion vous permettront de capter de nouveaux clients et
            d’augmenter significativement vos réservations en ligne.
          </p>
        </div>
        <div className={styles.benefitItem}>
          <h3>2. Optimisez la gestion de vos réservations</h3>
          <p>
            Avec TRANSOFT, vous pouvez automatiser et simplifier la gestion de
            vos billets. Notre interface intuitive vous permet de suivre les
            ventes, de gérer les disponibilités en temps réel et de réduire les
            erreurs humaines, tout en améliorant la satisfaction client.
          </p>
        </div>
        <div className={styles.benefitItem}>
          <h3>3. Un service client amélioré</h3>
          <p>
            Nous mettons à disposition des compagnies un{" "}
            <span className={styles.highlight}>support 24/7</span> pour répondre à toutes
            les demandes et résoudre les problèmes rapidement. Vous pourrez
            ainsi offrir une assistance client de qualité, en toute simplicité.
          </p>
        </div>
        <div className={styles.benefitItem} style={{
          marginBottom: "20px",
        }}>
          <h3>4. Réduisez vos coûts opérationnels</h3>
          <p>
            En digitalisant la vente des billets et la gestion des réservations,
            vous réduirez les coûts associés à la gestion papier, aux guichets
            physiques, et minimiserez les dépenses liées aux processus manuels.
            Cela vous permettra d’allouer vos ressources plus efficacement.
          </p>
        </div>
      </div>
      {/* <footer className={styles.footer}>
        <p>&copy; 2023 TRANSOFT. Tous droits réservés.</p>
      </footer> */}
    </div>
  );
};

export default AboutContainer;
