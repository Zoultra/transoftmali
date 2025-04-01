"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useLocation } from "react-router-dom";

export default function ReservationForm() {
  const location = useLocation();
  const { company, departure, arrival, date, price, commission } = location.state || {};

  // Nombre de billets et liste des passagers
  const [numTickets, setNumTickets] = useState(1);
  const [passengers, setPassengers] = useState([{ firstName: "", lastName: "", phone: "" }]);

  // Mise à jour du nombre de billets
  const handleNumTicketsChange = (e) => {
    const count = parseInt(e.target.value, 10) || 1;
    setNumTickets(count);

    // Met à jour le tableau des passagers avec les nouvelles entrées
    setPassengers((prevPassengers) =>
      Array.from({ length: count }, (_, i) => prevPassengers[i] || { firstName: "", lastName: "", phone: "" })
    );
  };

  // Mise à jour des valeurs des inputs
  const handleInputChange = (index, field, value) => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      )
    );
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construire les données à envoyer
    const reservationData = {
      user_id: "JJ5LjRLmRuEn6hV8O94dV", // Remplace par l'ID réel de l'utilisateur connecté
      route_id: "xAO0Gjneuq1o41nOZAzPP", // ID du trajet (peut-être à récupérer dynamiquement)
      seats_reserved: numTickets,
      status: "En attente", // Peut être "confirmed" après paiement
      passengers: passengers.map((p) => ({
        firstname: p.firstName,
        lastname: p.lastName,
        phone: p.phone,
      })),
    };
  
    try {
      const response = await fetch("https://transoftmali.onrender.com/api-transoft/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Réservation effectuée avec succès !");
        console.log("Réservation enregistrée:", result);
      } else {
        alert("Erreur lors de la réservation : " + result.message);
        console.error("Erreur:", result);
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      alert("Erreur de connexion au serveur.");
    }
  };
  

  return (
    
    <div className="isolate bg-white px-12 py-20 sm:py-24 lg:px-16 mt-8 mb-8 shadow-lg rounded-xl border border-gray-300 max-w-full mx-auto">

       {company ? (
        <>
          {/* En-tête */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Achat de billet
            </h2>
            <p className="mt-2 text-lg text-gray-600">Payez avec Orange Money en toute sécurité.</p>
          </div>

          {/* Détails du trajet */}
          <div className="bg-gray-100 shadow-md rounded-lg p-5 mx-auto mt-8 mb-6 border border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{company}</h2>
            <p className="text-lg font-semibold text-gray-800">Trajet : {departure} → {arrival}</p>
            <p className="text-lg text-gray-700">Date de départ : {date}</p>
            <p className="text-lg text-gray-700">Tarif : {price} FCFA</p>
            <p className="text-lg text-gray-700">Commission : {commission} FCFA</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl sm:mt-12">
            <div className="grid grid-cols-1 gap-y-6">
              {/* Sélection du nombre de billets */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Nombre de billets</label>
                <select
                  value={numTickets}
                  onChange={handleNumTicketsChange}
                  className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Inputs pour chaque passager */}
              {passengers.map((passenger, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Billet N°{index + 1}</h3>

                  {/* Prénom */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900">Prénom</label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
                      className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  {/* Nom */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-900">Nom</label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
                      className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900">Téléphone</label>
                    <div className="mt-2 flex rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                      <select className="bg-white px-3 py-2 rounded-l-md text-gray-600">
                        <option selected>+223</option>
                      </select>
                      <input
                        type="text"
                        placeholder="12-34-56-78"
                        value={passenger.phone}
                        onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                        className="flex-1 px-3 py-2 rounded-r-md focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton d'achat */}
            <div className="mt-8">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-4 py-2.5 text-center text-white font-semibold shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
              >
                Acheter avec Orange Money
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-center text-red-500">Aucune information de trajet disponible.</p>
      )}
    </div>
  );
}
