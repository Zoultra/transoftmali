import React from 'react';
import styles from './Features.module.css'; // Import du fichier CSS Module

function Features() {
  return (
    <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
      {/* Feature 1 */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
        <i className="fas fa-bus text-blue-600 text-4xl mb-3"></i>
        <h3 className="text-lg font-semibold">Large choix de compagnies</h3>
        <p className="text-gray-600">Accédez à un vaste réseau de compagnies de transport pour trouver le voyage parfait.</p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
        <i className="fas fa-wallet text-green-600 text-4xl mb-3"></i>
        <h3 className="text-lg font-semibold">Meilleurs prix garantis</h3>
        <p className="text-gray-600">Profitez des meilleures offres et tarifs compétitifs pour vos déplacements.</p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
        <i className="fas fa-headset text-red-600 text-4xl mb-3"></i>
        <h3 className="text-lg font-semibold">Service client 24/7</h3>
        <p className="text-gray-600">Notre équipe est à votre disposition pour vous assister à tout moment.</p>
      </div>

    </div>
  </div>
  );
}

export default Features;
