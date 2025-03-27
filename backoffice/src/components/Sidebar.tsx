import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bus, Calendar, Building2, Users } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          Vue d'ensemble
        </NavLink>
        <NavLink 
          to="/companies" 
          className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
        >
          <Building2 size={20} />
          Compagnies
        </NavLink>
        <NavLink 
          to="/vehicles" 
          className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
        >
          <Bus size={20} />
          Véhicules(Bus)
        </NavLink>
        <NavLink 
          to="/trajets" 
          className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
        >
          <Bus size={20} />
          Trajets
        </NavLink>
       
        <NavLink 
          to="/reservations" 
          className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
        >
          <Calendar size={20} />
          Reservations
        </NavLink>
        <NavLink 
          to="/users" 
          className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          Utilisateurs
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;