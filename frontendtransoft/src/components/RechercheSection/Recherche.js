import React ,{ useContext } from 'react';
import styles from './Recherche.module.css'; // Import du fichier CSS Module
 

function Recherche() {

   
    
  return (
    <div className={styles.hero}>
        <div className={styles.container}>
        <h2 className={styles.title}>Trouvez votre prochain voyage en quelques clics</h2>
            <div className={styles.searchForm}>
                <form id="searchForm" action="searchResult.html">
                    <input type="text" placeholder="Départ" required className={styles.input} />
                    <input type="text" placeholder="Destination" required className={styles.input} />
                    <input type="date" placeholder="Date du Voyage" required className={styles.input} />
                    {/* <select required className={styles.select}>
                        <option value="">Nombre de passagers</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                    </select> */}
                    <button type="submit" className={styles.button}>Rechercher</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Recherche;
