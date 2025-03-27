import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import '../styles/Companies.css';

// 📌 Interface Company
interface Company {
  company_id: string;
  company_name: string;
  address: string;
  phone: string;
}

// 📌 URL de l'API
const API_URL = "http://localhost:3001/api-transoft/company";

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 📌 Récupérer les entreprises
  const fetchCompanies = async () => {
    try {
      const response = await axios.get<Company[]>(API_URL);
      setCompanies(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des entreprises:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // 🔍 Filtrer les entreprises
  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🛠 Réinitialiser le formulaire
  const resetForm = () => {
    setEditingCompany(null);
    setIsEditing(false);
    setShowModal(false);
  };

  // ✅ Ajouter ou modifier une entreprise
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && editingCompany) {
        await axios.put(`${API_URL}/${editingCompany.company_id}`, editingCompany);
      } else {
        const { company_id, ...newCompanyData } = editingCompany!;
        await axios.post(API_URL, newCompanyData);
      }

      fetchCompanies(); // 🔄 Mettre à jour la liste
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification:", error);
    }
  };

  // ✏️ Modifier une entreprise
  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsEditing(true);
    setShowModal(true);
  };

  // ❌ Supprimer une entreprise
  const handleDelete = async (company_id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compagnie ?')) {
      try {
        await axios.delete(`${API_URL}/${company_id}`);
        fetchCompanies();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <div className="companies-container">
      <div className="companies-header">
        <h2>Compagnies de Transport</h2>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Rechercher une compagnie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-button" onClick={() => { resetForm(); setShowModal(true); }}>
            <Plus size={20} /> Ajouter une compagnie
          </button>
        </div>
      </div>

      {/* Tableau des compagnies */}
      <div className="companies-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map(company => (
              <tr key={company.company_id}>
                <td>{company.company_name}</td>
                <td>{company.address}</td>
                <td>{company.phone}</td>
                <td className="actions">
                  <button className="icon-button" onClick={() => handleEdit(company)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="icon-button delete" onClick={() => handleDelete(company.company_id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour ajouter/modifier une compagnie */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{isEditing ? 'Modifier la compagnie' : 'Ajouter une compagnie'}</h3>
              <button className="close-button" onClick={resetForm}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom de la compagnie</label>
                <input
                  type="text"
                  value={editingCompany?.company_name || ''}
                  onChange={e => setEditingCompany(prev => ({ ...prev!, company_name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  value={editingCompany?.address || ''}
                  onChange={e => setEditingCompany(prev => ({ ...prev!, address: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={editingCompany?.phone || ''}
                  onChange={e => setEditingCompany(prev => ({ ...prev!, phone: e.target.value }))}
                  required
                />
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

export default Companies;
