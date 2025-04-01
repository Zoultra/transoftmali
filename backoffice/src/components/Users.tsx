import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";

// 📌 Interface Utilisateur
interface User {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password?: string; // Optionnel (uniquement pour l'ajout)
  role: "admin" | "manager" | "client";
  statut: "actif" | "inactif";
}

// 📌 URL de l'API
//const API_URL = "http://localhost:3001/api-transoft/users"; 
const API_URL = "https://transoftmali.onrender.com/api-transoft/users";
const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 📌 Récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔍 Filtrer les utilisateurs
  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🛠 Réinitialiser le formulaire
  const resetForm = () => {
    setEditingUser(null);
    setIsEditing(false);
    setShowModal(false);
  };

  // ✅ Ajouter ou modifier un utilisateur
   


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, editingUser);
      } else {
        const { id, ...newRouteData } = editingUser!;
        await axios.post(API_URL,  { ...newRouteData, statut: "actif" });
      }
      fetchUsers(); // 🔄 Mettre à jour la liste
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification:", error);
    }
  };

  // ✏️ Modifier un utilisateur
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  // ❌ Désactiver un utilisateur au lieu de le supprimer
const handleDisable = async (id: string) => {
  if (window.confirm("Êtes-vous sûr de vouloir désactiver cet utilisateur ?")) {
    try {
      await axios.put(`${API_URL}/${id}`, { statut: "inactif" });
      fetchUsers(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
      console.error("Erreur lors de la désactivation:", error);
    }
  }
};

// ✅ Activer un utilisateur (mettre statut "actif")
const handleActivate = async (id: string) => {
  try {
    await axios.put(`${API_URL}/${id}`, { statut: "actif" });
    fetchUsers(); // Rafraîchir la liste
  } catch (error) {
    console.error("Erreur lors de l'activation:", error);
  }
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2 text-gray-400" size={18} />
            <input
              type="text"
              className="pl-8 pr-4 py-2 border rounded w-60"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <Plus size={20} className="mr-2" /> Ajouter
          </button>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Nom</th>
              <th className="p-3 border">Prénom</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Téléphone</th>
              <th className="p-3 border">Rôle</th>
              <th className="p-3 border">Statut</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="p-3 border">{user.nom}</td>
                <td className="p-3 border">{user.prenom}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.telephone}</td>
                <td className="p-3 border">{user.role}</td>
                <td className={`p-3 border font-bold ${user.statut === "actif" ? "text-green-500" : "text-red-500"}`}>
                 {user.statut}
                </td>
              
                <td className="p-3 border">
                <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <Edit2 size={16} />
                  </button>
  {user.statut === "actif" ? (
    // Si l'utilisateur est actif, afficher le bouton de désactivation
    <button
      className="text-red-500"
      onClick={() => handleDisable(user.id)}
    >
      <Trash2 size={16} />
    </button>
  ) : (
    // Si l'utilisateur est inactif, afficher le bouton "Activer"
    <button
      className="bg-green-500 text-white px-2 py-1 rounded"
      onClick={() => handleActivate(user.id)}
    >
      Activer
    </button>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour ajouter/modifier un utilisateur */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {isEditing ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
              </h3>
              <button onClick={resetForm}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input className="w-full border p-2 mb-2" type="text" placeholder="Nom" value={editingUser?.nom || ''} onChange={e => setEditingUser(prev => ({ ...prev!, nom: e.target.value }))} required />
              <input className="w-full border p-2 mb-2" type="text" placeholder="Prénom" value={editingUser?.prenom || ''} onChange={e => setEditingUser(prev => ({ ...prev!, prenom: e.target.value }))} required />
              <input className="w-full border p-2 mb-2" type="email" placeholder="Email" value={editingUser?.email || ''} onChange={e => setEditingUser(prev => ({ ...prev!, email: e.target.value }))} required />
              <input className="w-full border p-2 mb-2" type="text" placeholder="Téléphone" value={editingUser?.telephone || ''} onChange={e => setEditingUser(prev => ({ ...prev!, telephone: e.target.value }))} required />
              <input className="w-full border p-2 mb-2" type="password" placeholder="password" value={editingUser?.password || ''} onChange={e => setEditingUser(prev => ({ ...prev!, password: e.target.value }))} required />
              <select className="w-full border p-2 mb-4" value={editingUser?.role || ''} onChange={e => setEditingUser(prev => ({ ...prev!, role: e.target.value as User["role"] }))} required>
                <option value="">Sélectionner un rôle</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="client">Client</option>
              </select>
              <button className="w-full bg-blue-500 text-white py-2 rounded">{isEditing ? "Modifier" : "Ajouter"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
