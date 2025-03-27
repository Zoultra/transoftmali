import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import "../styles/Trajets.css";

// 📌 Interface Route
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

// 📌 Interface Bus
interface Bus {
  bus_id: string;
  bus_number: string;
  company_id:string;
}


interface Company {
  company_id: string;
  company_name: string;
}

// 📌 URL de l'API
const API_URL = "http://localhost:3001/api-transoft/routes";
const API_BUSES = "http://localhost:3001/api-transoft/buses";
const API_COMPANIES = "http://localhost:3001/api-transoft/company";

const Routes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 📌 Récupérer les trajets
  const fetchRoutes = async () => {
    try {
      const response = await axios.get<Route[]>(API_URL);
      setRoutes(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des trajets:", error);
    }
  };

  // 📌 Récupérer les bus
  const fetchBuses = async () => {
    try {
      const response = await axios.get<Bus[]>(API_BUSES);
      setBuses(response.data);
      console.log(response)
    } catch (error) {
      console.error("Erreur lors du chargement des bus:", error);
    }
  };

   // 📌 Récupérer les compagnies pour la sélection
   const fetchCompanies = async () => {
    try {
      const response = await axios.get<Company[]>(API_COMPANIES);
      setCompanies(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des compagnies:', error);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchBuses();
    fetchCompanies();
  }, []);

  // 🔍 Filtrer les trajets
  const filteredRoutes = routes.filter(
    (route) =>
      (route.departure_city &&
        route.departure_city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (route.arrival_city &&
        route.arrival_city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 🛠 Réinitialiser le formulaire
  const resetForm = () => {
    setEditingRoute(null);
    setIsEditing(false);
    setShowModal(false);
  };

  // ✅ Ajouter ou modifier un trajet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingRoute) {
        await axios.put(`${API_URL}/${editingRoute.route_id}`, editingRoute);
      } else {
        const { route_id, ...newRouteData } = editingRoute!;
        await axios.post(API_URL, newRouteData);
      }
      fetchRoutes(); // 🔄 Mettre à jour la liste
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification:", error);
    }
  };

  // ✏️ Modifier un trajet
  const handleEdit = (route: Route) => {
    setEditingRoute(route);
    setIsEditing(true);
    setShowModal(true);
  };

  // ❌ Supprimer un trajet
  const handleDelete = async (route_id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce trajet ?")) {
      try {
        await axios.delete(`${API_URL}/${route_id}`);
        fetchRoutes();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  return (
    <div className="routes-container">
      <div className="routes-header">
        <h2>Liste des trajets</h2>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Rechercher un trajet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="add-button"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <Plus size={20} /> Ajouter un trajet
          </button>
        </div>
      </div>

      {/* Tableau des trajets */}
      <div className="routes-table">
        <table>
          <thead>
            <tr>
              <th>Départ</th>
              <th>Arrivée</th>
              <th>Heure de départ</th>
              <th>Heure d'arrivée</th>
              <th>Jour du Voyage</th>
              <th>Compagnie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.route_id}>
                <td>{route.departure_city}</td>
                <td>{route.arrival_city}</td>
                <td>{route.departure_time}</td>
                <td>{route.arrival_time}</td>
                <td>{route.routes_day}</td>
                <td>{companies.find(c => c.company_id === route.company_id)?.company_name || 'N/A'}</td>
                
                <td className="actions">
                  <button
                    className="icon-button"
                    onClick={() => handleEdit(route)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="icon-button delete"
                    onClick={() => handleDelete(route.route_id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour ajouter/modifier un trajet */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{isEditing ? "Modifier le trajet" : "Ajouter un trajet"}</h3>
              <button className="close-button" onClick={resetForm}>
                <X size={20} />
              </button>
            </div>


            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ville de départ</label>
                <input type="text" value={editingRoute?.departure_city || ''} onChange={e => setEditingRoute(prev => ({ ...prev!, departure_city: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Ville d'arrivée</label>
                <input type="text" value={editingRoute?.arrival_city || ''} onChange={e => setEditingRoute(prev => ({ ...prev!, arrival_city: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Heure de départ</label>
                <input type="time" value={editingRoute?.departure_time || ''} onChange={e => setEditingRoute(prev => ({ ...prev!, departure_time: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Heure d'arrivée</label>
                <input type="time" value={editingRoute?.arrival_time || ''} onChange={e => setEditingRoute(prev => ({ ...prev!, arrival_time: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Jour du voyage</label>
                <input type="date" value={editingRoute?.routes_day || ''} onChange={e => setEditingRoute(prev => ({ ...prev!, routes_day: e.target.value }))} required />
              </div>
              <div className="mb-4">
  <label className="block text-gray-700 text-sm font-medium mb-2">
    Compagnie
  </label>
  <select
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    value={editingRoute?.company_id || ''}
    onChange={(e) =>
      setEditingRoute((prev) => ({
        ...prev!,
        company_id: e.target.value,
      }))
    }
    required
  >
    <option value="" disabled>
      Sélectionnez une compagnie
    </option>
    {companies.map((company) => (
      <option key={company.company_id} value={company.company_id}>
        {company.company_name}
      </option>
    ))}
  </select>
</div>

              <div className="form-buttons">
                <button type="submit" className="submit-button">{isEditing ? 'Modifier' : 'Ajouter'}</button>
                <button type="button" className="cancel-button" onClick={resetForm}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routes;
