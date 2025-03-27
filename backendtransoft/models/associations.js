// models/associations.js
import Company from './company.js';
import Buses from './buses.js';

// Définir les relations
Company.hasMany(Buses, { foreignKey: 'company_id', as: 'buses' });
Buses.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

export default function associateModels() {
  // Les associations sont définies ici.
}
