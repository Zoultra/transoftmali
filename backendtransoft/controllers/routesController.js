import Route from '../models/routes.js';
import Company from '../models/company.js';

export const createRoute = async (req, res) => {
 
    try {
      const {...routeData } = req.body;
      const routes = await Route.create({ ...routeData});
      res.status(201).json({ message: 'Le trajet a été créé', routes: routes });
    } catch (error) {      
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
  };

  export const getRoutes = async (req, res) => {
    try {
      const routes = await Route.findAll({
        include: [
          {
            model: Company,
            as: "company", // Correspond à l'alias défini dans le modèle Bus
            attributes: ["company_id", "company_name"], // Sélectionner seulement ces colonnes
          },
        ],
      });
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const searchRoutes = async (req, res) => {
 
    try {
        const { departure_city, arrival_city } = req.query; // Récupère les critères de recherche de la requête

        // Construction de l'objet "where" pour les critères dynamiques
        const whereClause = {};
        if (departure_city) whereClause.departure_city = departure_city;
        if (arrival_city) whereClause.arrival_city = arrival_city;

        // Recherche dans la base de données
        const routes = await Route.findAll({ where: whereClause });
        
        if (routes) {
            res.status(200).json(routes);
          } else{
            res.status(404).json({ message: 'Trajet non trouvé' });
          
          }
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        res.status(500).json({ error: 'Erreur lors de la recherche des utilisateurs' });
    }
};

export const getRouteById = async (req, res) => {
    try {
      const route = await Route.findByPk(req.params.route_id);
      if (route) {
        res.status(200).json(route);
      } else {
        res.status(404).json({ message: 'Voyage non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
export const updateRoute = async (req, res) => {
    try {
      const [updated] = await Route.update(req.body, {
        where: { route_id: req.params.route_id },
      });
      if (updated) {
        const updateRoute = await Route.findByPk(req.params.route_id);
        res.status(200).json(updateRoute);
      } else {
        res.status(404).json({ message: 'Voyage non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
export const deleteRoute = async (req, res) => {
    try {
      const deleted = await Route.destroy({
        where: { route_id: req.params.route_id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Voyage non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };