import React, { useState } from "react";
import { useLocation } from "react-router-dom";



const ReservationForm = () => {
  const location = useLocation();
  const { company, departure, arrival, date, price, commission } = location.state || {};

  const [numTickets, setNumTickets] = useState(1);
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', phone: '' }]);

  const handleNumTicketsChange = (e) => {
    const count = parseInt(e.target.value, 10) || 1;
    setNumTickets(count);
    setPassengers(Array.from({ length: count }, () => ({ firstName: '', lastName: '', phone: '' })));
  };

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Détails des passagers:', passengers);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto mt-8">
      {/* Vérification des données */}
      {company ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{company}</h2>
            <p className="text-gray-600"><span className="font-medium">Trajet :</span> {departure} - {arrival}</p>
            <p className="text-gray-600"><span className="font-medium">Date de départ :</span> {date}</p>
            <p className="text-gray-600"><span className="font-medium">Tarif :</span> {price} FCFA</p>
            <p className="text-gray-600"><span className="font-medium">Commission :</span> {commission} FCFA</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Nombre de billets</label>
              <select
                value={numTickets}
                onChange={handleNumTicketsChange}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>

            {/* Détails des passagers */}
            {passengers.map((passenger, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Billet N°{index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={passenger.phone}
                      onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Bouton de soumission */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ACHETER
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-center text-red-500">Aucune information de trajet disponible.</p>
      )}






      
    </div>
  );
};

export default ReservationForm;
