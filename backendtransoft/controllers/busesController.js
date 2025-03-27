import Buses from '../models/buses.js';
import Company from '../models/company.js';

export const createBuses = async (req, res) => {
  try {
    const { ...busesData } = req.body;

     // Vérifier si un bus avec la même plaque existe déjà
     const existingBus = await Buses.findOne({ where: { bus_number: req.body.bus_number } });
     if (existingBus) {
        return res.status(400).json({ message: 'Ce numéro de bus existe déjà, verifiez dans la base.' });
      }

    const buses = await Buses.create({ ...busesData });
    res.status(201).json({ message: 'Le bus a été créé', buses: buses });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: 'Ce Bus existe déja. Veuillez en choisir un autre numéro.' });
  } else {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
  }
};

export const getBuses = async (req, res) => {
  try {
    const buses = await Buses.findAll({
      include: [
        {
          model: Company,
          as: "company", // Correspond à l'alias défini dans le modèle Bus
          attributes: ["company_id", "company_name"], // Sélectionner seulement ces colonnes
        },
      ],
    });

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusesById = async (req, res) => {
  try {
    const buses = await Buses.findByPk(req.params.bus_id);
    if (buses) {
      res.status(200).json(buses);
    } else {
      res.status(404).json({ message: 'Bus non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBuses = async (req, res) => {
  try {
    const [updated] = await Buses.update(req.body, {
      where: { bus_id: req.params.bus_id },
    });
    if (updated) {
      const updateBuses = await Buses.findByPk(req.params.bus_id);
      res.status(200).json(updateBuses);
    } else {
      res.status(404).json({ message: 'Bus non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBuses = async (req, res) => {
  try {
    const deleted = await Buses.destroy({
      where: { bus_id: req.params.bus_id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Bus non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
