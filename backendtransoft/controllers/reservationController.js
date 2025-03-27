import Reservation from '../models/reservation.js';  
import User from '../models/user.js'; 
import Passenger from '../models/passenger.js';
import Route from '../models/routes.js';

export const createReservation = async (req, res) => {  
    try {
        console.log("Données reçues :", req.body);

        const { passengers, ...reservationData } = req.body;

        if (!passengers || passengers.length === 0) {
            return res.status(400).json({ message: "Veuillez ajouter au moins un passager." });
        }

        // Création de la réservation
        const reservation = await Reservation.create(reservationData);

        // Ajouter chaque passager lié à cette réservation
        const passengerRecords = await Promise.all(
            passengers.map(async (passenger) => {
                if (!passenger.firstname || !passenger.lastname || !passenger.phone) {
                    throw new Error("Tous les passagers doivent avoir un prénom, un nom et un numéro de téléphone.");
                }

                return await Passenger.create({ 
                    firstname: passenger.firstname,  
                    lastname: passenger.lastname,
                    phone: passenger.phone,
                    reservation_id: reservation.reservation_id  // Utilisation correcte de l'ID généré
                });
            })
        );

        res.status(201).json({ 
            message: 'La réservation a été créée avec les passagers',
            reservation,
            passengers: passengerRecords
        });

    } catch (error) {      
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

export const getReservations = async (req, res) => {  
    try {
        const reservations = await Reservation.findAll({
            include: [
                {
                    model: User,
                    as: "user", // ✅ Correspond au `as: "user"` défini dans `Reservation.js`
                    attributes: ["id", "nom", "prenom", "telephone"], 
                },
                {
                    model: Route,
                    as: "route", // ✅ Correspond au `as: "route"` défini dans `Reservation.js`
                    attributes: ["route_id", "departure_city", "arrival_city", "routes_day"], 
                }
                ,
                {
                    model: Passenger, // 🔹 Ajout des passagers
                    as: "passengers",
                    attributes: ["passenger_id", "firstname", "lastname", "phone"], // Sélectionne les champs utiles
                }
            ]
        });  
        res.status(200).json(reservations); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getReservationById = async (req, res) => {  
    try {
        const reservation = await Reservation.findByPk(req.params.reservation_id);  
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ message: 'Réservation non trouvée' });  
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReservation = async (req, res) => {  
    try {
        const [updated] = await Reservation.update(req.body, {  
            where: { reservation_id: req.params.reservation_id },  
        });
        if (updated) {
            const updatedReservation = await Reservation.findByPk(req.params.reservation_id);  
            res.status(200).json(updatedReservation);
        } else {
            res.status(404).json({ message: 'Réservation non trouvée' }); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReservation = async (req, res) => { 
    
    try {
        const deleted = await Reservation.destroy({ 
            where: { reservation_id: req.params.reservation_id }, 
        });
        
        if (deleted) {
            res.status(204).json({ message: 'Réservation supprimée.' });  
        } else {
            res.status(404).json({ message: 'Réservation non trouvée' });  
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};