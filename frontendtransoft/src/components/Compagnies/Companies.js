import React from 'react';
import styles from "./Compagnies.module.css";
function Companies() {
  const companies = [
    {
      imgSrc: 'img/sonef_trans.jpeg',
      name: 'SONEF Trans',
      description: 'Voyagez confortablement à travers le pays'
    },
    {
      imgSrc: 'img/diarra_transport.jpeg',
      name: 'Diarra Trans',
      description: 'La sécurité et le confort au cœur de nos services'
    },
    {
      imgSrc: 'img/Africa tour trans.gif',
      name: 'Africa Tour Trans',
      description: 'Découvrez l\'Afrique à travers nos circuits'
    },
    {
      imgSrc: 'img/SAMA_Trans.jpeg',
      name: 'SAMA Trans',
      description: 'Votre passerelle vers les destinations sahéliennes'
    }
  ];

  return (
    <section className={styles.Companies} id="companies">
      <div className={styles.OurPartners}>
        <h1 className={styles.nosCompagnies}>Nos Compagnies Partenaires</h1>
      </div>
      
      <div className={styles.companies}>
        {companies.map((company, index) => (
          <div className={styles.compagniesGrid} key={index}>
            <img src={company.imgSrc} alt={`${company.name} Logo`} width="250" height="200" />
            <div className={styles.compagnyInfo}>
              <h3>{company.name}</h3>
              <p>{company.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Companies;
