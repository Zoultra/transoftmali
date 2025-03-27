import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import '../styles/Vehicles.css';

// 📌 Interfaces
interface Bus {
  bus_id?: string; // Généré automatiquement par le backend
  bus_number: string;
  capacity: number;
  company_id: string;
}

interface Company {
  company_id: string;
  company_name: string;
}

// 📌 URL de l'API
const API_BUSES = "http://localhost:3001/api-transoft/buses";
const API_COMPANIES = "http://localhost:3001/api-transoft/company";

const Buses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 📌 Récupérer les bus
  const fetchBuses = async () => {
    try {
      const response = await axios.get<Bus[]>(API_BUSES);
      setBuses(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des bus:', error);
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
    fetchBuses();
    fetchCompanies();
  }, []);

  // 🔍 Filtrer les bus
  const filteredBuses = buses.filter(bus =>
    bus.bus_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🛠 Réinitialiser le formulaire
  const resetForm = () => {
    setEditingBus(null);
    setIsEditing(false);
    setShowModal(false);
  };

  // ✅ Ajouter ou modifier un bus
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && editingBus?.bus_id) {
        await axios.put(`${API_BUSES}/${editingBus.bus_id}`, editingBus);
      } else {
        const { bus_id, ...newBusData } = editingBus!;
        await axios.post(API_BUSES, newBusData);
      }

      fetchBuses(); // 🔄 Mettre à jour la liste
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification:", error);
    }
  };

  // ✏️ Modifier un bus
  const handleEdit = (bus: Bus) => {
    setEditingBus(bus);
    setIsEditing(true);
    setShowModal(true);
  };

  // ❌ Supprimer un bus
  const handleDelete = async (bus_id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bus ?')) {
      try {
        await axios.delete(`${API_BUSES}/${bus_id}`);
        fetchBuses();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <div className="buses-container">
      <div className="buses-header">
        <h2>Gestion des Bus</h2>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Rechercher un bus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-button" onClick={() => { resetForm(); setShowModal(true); }}>
            <Plus size={20} /> Ajouter un bus
          </button>
        </div>
      </div>

      {/* Tableau des bus */}
      <div className="buses-table">
        <table>
          <thead>
            <tr>
              <th>Numéro du Bus</th>
              <th>Capacité</th>
              <th>Compagnie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuses.map(bus => (
              <tr key={bus.bus_id}>
                <td>{bus.bus_number}</td>
                <td>{bus.capacity}</td>
                <td>{companies.find(c => c.company_id === bus.company_id)?.company_name || 'N/A'}</td>
                <td className="actions">
                  <button className="icon-button" onClick={() => handleEdit(bus)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="icon-button delete" onClick={() => handleDelete(bus.bus_id!)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour ajouter/modifier un bus */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{isEditing ? 'Modifier un bus' : 'Ajouter un bus'}</h3>
              <button className="close-button" onClick={resetForm}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Numéro du Bus</label>
                <input
                  type="text"
                  value={editingBus?.bus_number || ''}
                  onChange={e => setEditingBus(prev => ({ ...prev!, bus_number: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacité</label>
                <input
                  type="number"
                  value={editingBus?.capacity || ''}
                  onChange={e => setEditingBus(prev => ({ ...prev!, capacity: parseInt(e.target.value) || 0 }))}
                  required
                />
              </div>
               

              <div className="mb-4">
  <label className="block text-gray-700 text-sm font-medium mb-2">
    Compagnie
  </label>
  <select
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    value={editingBus?.company_id || ''}
    onChange={(e) =>
      setEditingBus((prev) => ({
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
                <button type="submit" className="submit-button">
                  {isEditing ? 'Modifier' : 'Ajouter'}
                </button>
                <button type="button" className="cancel-button" onClick={resetForm}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buses;
