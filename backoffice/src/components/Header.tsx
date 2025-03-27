// import React from 'react';
// import { LogOut } from 'lucide-react';
// import '../styles/Header.css';

// const Header = () => {
//   const handleLogout = () => {
//     // Implémentation de la déconnexion
//     console.log('Déconnexion...');
//   };

//   return (
//     <header className="header">
//       <div className="header-content">
//         <div className="header-title">
//           <h1>TRANSOFT</h1>
//           <div className="subtitle">ADMIN INTERFACE</div>
//         </div>
//         <button className="logout-button" onClick={handleLogout}>
//           <LogOut size={20} />
//           <span>Déconnexion</span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import '../styles/Header.css';

const Header = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>TRANSOFT</h1>
          <div className="subtitle">ADMIN INTERFACE</div>
        </div>
        <div className="header-right">
          <span className="user-info">
            {user?.name} ({user?.role})
          </span>
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;