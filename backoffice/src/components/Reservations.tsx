import React, { useEffect, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import '../styles/Reservations.css';

 

interface User {
  user_id: number;
  nom: string;
  prenom: string;
  telephone: string;
}

interface Route {
  route_id: string;
  departure_city: string;
  arrival_city: string;
  departure_time: string;
  arrival_time: string;
  routes_day: string;
  bus_id: string;
  company_id: string
}

interface Passenger {
  passenger_id: number;
  firstname: string;
  lastname: string;
  phone: number;
}

interface Reservation {
  reservation_id: number;
  route_id: number;
  status: string;
  seats_reserved: string;
  user: User;
  route: Route,
  passengers: Passenger[];
}



//const API_URL = "http://localhost:3001/api-transoft/reservation"; // ✅ URL API
const API_URL = "https://transoftmali.onrender.com/api-transoft/reservation"; // ✅ URL API

const Reservations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des réservations");
      }
      const data: Reservation[] = await response.json();
      setReservations(data);
      console.log(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };
  
  const deleteReservation = async (reservationId: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;
  
    try {
      const response = await fetch(`${API_URL}/${reservationId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la réservation");
      }
  
      setReservations(reservations.filter(res => res.reservation_id !== reservationId));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
    }
  };
  

  if (loading) return <p>Chargement des réservations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Filtrage des réservations en fonction du champ de recherche
  const filteredReservations = reservations.filter((reservation) =>
    reservation.status.toLowerCase().includes(searchTerm.toLowerCase() )
  );

  // Statistiques
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const confirmationRate = totalReservations > 0 ? ((confirmedReservations / totalReservations) * 100).toFixed(2) : 0;

  return (
    <div className="reservations-container">
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher par statut..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="reservations-table">
        <table>
          <thead>
            <tr>
              <th>Utilisateurs</th>
              <th>Itinéraire</th>
              <th>Nbre de places</th>
              <th>Passagers</th>
              <th>Statut</th>
              <th>Actions</th>  
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                
                <td>
                 {reservation.user
                  ? `${reservation.user.prenom || "N/A"} ${reservation.user.nom || "N/A"} (${reservation.user.telephone || "N/A"})`
                 : "Utilisateur inconnu"}
               </td>
               <td>
                    {reservation.route
                    ? `${reservation.route.departure_city || "N/A"} → ${reservation.route.arrival_city || "N/A"} (${reservation.route.routes_day || "N/A"})`
                    : "Trajet inconnu"}
               </td>
                <td>{reservation.seats_reserved}</td>
                <td>
                   {reservation.passengers && reservation.passengers.length > 0 ? (
                   reservation.passengers.map((passenger: Passenger, index: number) => (
                   <div key={index}>
                   {`${passenger.firstname || "N/A"} ${passenger.lastname || "N/A"} (${passenger.phone || "N/A"})`}
                   </div>
                    ))
                     ) : (
                            "Aucun passager"
                    )}
               </td>

                <td>
                  <span className={`status ${getStatusClass(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td>
                  {/* ✅ Bouton Supprimer */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteReservation(reservation.reservation_id)}
                  >
                    <Trash2 size={18} color="red" /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="statistics-section">
        <div className="stat-card">
          <h3>Total des réservations</h3>
          <p>{totalReservations}</p>
        </div>
        <div className="stat-card">
          <h3>Taux de confirmation</h3>
          <p>{confirmationRate}%</p>
        </div>
      </div>
    </div>
  );
};

// Fonction pour appliquer une classe CSS aux statuts
const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmée":
      return "status-confirmed";
    case "annulée":
      return "status-canceled";
    default:
      return "status-pending";
  }
};

export default Reservations;
