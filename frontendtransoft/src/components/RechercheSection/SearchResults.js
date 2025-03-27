import React, { useEffect, useState } from 'react';
import ResultCards from './ResultCards';
import styles from './SearchResults.module.css';

function SearchResults() {
  
   
  const API_URL = "http://localhost:3001/api-transoft/routes";
  const API_URL_COMPANY = "http://localhost:3001/api-transoft/company";
  
  const [trajets, setTrajets] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchTrajets = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des Trajets");
      }
      const data = await response.json();
      setTrajets(data);
    } catch (error) {
      setError(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch(API_URL_COMPANY);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des Compagnies");
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      setError(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrajets();
    fetchCompanies();
  }, []);


  if (loading) return <p>Chargement des Trajets...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;



  return (
    <div className={styles.searchResults}>
      <h2>Résultats de recherche</h2>
      <p>Trajet : Bamako - Segou</p>
      <p>Date : 11/05/2024</p>
      
      <div className={styles.resultCardsContainer}>

      {trajets.map((trajet) => (
        <ResultCards
          key={trajet.route_id}
          company= {companies.find(c => c.company_id === trajet.company_id)?.company_name || 'N/A'}
          departure={trajet.departure_city} // Ville de départ
          arrival={trajet.arrival_city} // Ville d'arrivée
          date={trajet.routes_day} // Date du trajet
          departure_time={trajet.departure_time} // Heure du trajet
          arrival_time={trajet.arrival_time} // Heure du trajet
          price= '3000 FCFA'
          
        />
      ))}
        
        
           </div>
    </div>
  );
}

export default SearchResults;
 
