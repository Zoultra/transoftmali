import React, { useState,useContext, useEffect, useRef  } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import AuthContext from '../Security/AuthContext';
import { FaUser } from 'react-icons/fa'; // Import de l'icône utilisateur

function Navbar() {
   
  const { auth, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
// Ferme le menu lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
          <img
                src="img/Frame 2.png"
                alt="Logo"
                width="155px"
                height="45px"
              />
          </div>
          
          {/* Utilisez styles.navLinks pour CSS Modules */}
          <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
            <li><NavLink to="/accueil">Accueil</NavLink></li>
            {/* <li><NavLink to="/reservation">Réservation</NavLink></li> */}
           {/*  <li><NavLink to="/recherche">Rechercher un Voyage</NavLink></li> */}
            <li><NavLink to="/contact">Nous-Contactez</NavLink></li>
            <li><NavLink to="/about">A propos</NavLink></li>
            {/*   <li><NavLink to="/" onClick={() => logout()}>Se deconnecter</NavLink></li>*/}
        
           

            {auth.isLoggedIn ? (
  <li>
    <div className={styles.profileIcon} onClick={toggleDropdown} ref={dropdownRef}>
      <FaUser className={styles.icon} />
      {dropdownOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.dropdownItem}>Voir mon compte</button>
          <button className={styles.dropdownItem}>Modifier mon compte</button>
          <button onClick={() => logout()} className={styles.dropdownItem}>Se déconnecter</button>
        </div>
      )}
    </div>
  </li>
) : (
  <li><NavLink to="/connexion">Se connecter</NavLink></li>
)}

          </ul>
          
          {/* Utilisez styles.burgerMenu pour CSS Modules */}
          <div className={`${styles.burgerMenu} ${menuOpen ? styles.active : ''}`} onClick={toggleMenu}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
