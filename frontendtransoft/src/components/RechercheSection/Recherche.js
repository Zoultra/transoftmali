import React ,{ useContext } from 'react';
import styles from './Recherche.module.css'; // Import du fichier CSS Module
 

function Recherche() {

   
    
  return (
    <div className={styles.hero} id="recherche">
        <div className={styles.container}>
        <h2 className={styles.title}>Trouvez votre prochain voyage en quelques clics</h2>
            <div className={styles.searchForm} >
                <form id="searchForm" action="searchResult.html">
                    {/* <input type="text" placeholder="Départ" required className={styles.input} />
                    <input type="text" placeholder="Destination" required className={styles.input} /> */}
                    <select required className={styles.select} id="depart">
                        <option value="">Départ</option>
                        <option value="Bamako">Bamako</option>
                        <option value="Kayes">Kayes</option>
                        <option value="Koulikoro">Koulikoro</option>
                        <option value="Segou">Segou</option>
                        <option value="Sikasso">Sikasso</option>
                    </select>
                    <select required className={styles.select} id="destination">
                        <option value="">Destination</option>
                        <option value="Kayes">Kayes</option>
                        <option value="Koulikoro">Koulikoro</option>
                        <option value="Segou">Segou</option>
                        <option value="Sikasso">Sikasso</option>
                    </select>
                    <input type="date" placeholder="Date du Voyage" required className={styles.select} id="date" />
                    <button type="submit" className={styles.button}>Rechercher</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Recherche;
