import Company from '../models/company.js';
import Buses from '../models/buses.js';
import Route from "../models/routes.js"; // Import du modèle de trajet

export const createCompany = async (req, res) => {
 
    try {
      const {...companyData } = req.body;
      const company = await Company.create({ ...companyData});
      res.status(201).json({ message: 'La compagnie a été créée', company: company });
    } catch (error) {      
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
  };

  export const getCompany = async (req, res) => {
    try {
      const company = await Company.findAll();
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 

export const getCompanyById = async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.company_id);
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ message: 'Compagnie non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
export const updateCompany = async (req, res) => {
    try {
      const [updated] = await Company.update(req.body, {
        where: { company_id: req.params.company_id },
      });
      if (updated) {
        const updateCompany = await Company.findByPk(req.params.company_id);
        res.status(200).json(updateCompany);
      } else {
        res.status(404).json({ message: 'Compagnie non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

   
  
  export const deleteCompany = async (req, res) => {
    const companyId = req.params.company_id;
  
    try {
      // 🛑 Vérifier s'il existe des trajets ou bus associés à cette compagnie
      const existingRoutes = await Route.findOne({ where: { company_id: companyId } });
      const existingBuses = await Buses.findOne({ where: { company_id: companyId } });
  
      if (existingRoutes) {
        return res.status(400).json({
          message: "Impossible de supprimer cette compagnie car elle est associée à un trajet.",
        });
      }

      if(existingBuses){
        return res.status(400).json({
          message: "Impossible de supprimer cette compagnie car elle est associée à un Bus."
        })
      }
  
      // ✅ Mettre à jour tous les bus pour supprimer l'association avec cette compagnie
      await Buses.update(
        { company_id: 'N/A' }, // Supprime l'association
        { where: { company_id: companyId } } // Filtre les bus liés
      );

       // ✅ Mettre à jour tous les bus pour supprimer l'association avec cette compagnie
       await Route.update(
        { company_id: 'N/A' }, // Supprime l'association
        { where: { company_id: companyId } } // Filtre les bus liés
      );
  
      // ✅ Supprimer la compagnie
      const deleted = await Company.destroy({ where: { company_id: companyId } });
  
      if (deleted) {
        res.status(200).json({ message: "Compagnie supprimée avec succès et bus mis à jour." });
      } else {
        res.status(404).json({ message: "Compagnie non trouvée." });
      }
  
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression.", error: error.message });
    }
  };
  