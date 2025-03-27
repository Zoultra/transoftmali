import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reservations from './components/Reservations';
import Vehicles from './components/Vehicles';
import Companies from './components/Companies';
import Users from './components/Users';
import Trajet from './components/Trajets';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app">
                  <Sidebar />
                  <div className="main-content">
                    <Header />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/reservations" element={<Reservations />} />
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route path="/companies" element={<Companies />} />
                      <Route path="/trajets" element={<Trajet />} />
                      <Route 
                        path="/users" 
                        element={
                          <ProtectedRoute requireAdmin>
                            <Users />
                          </ProtectedRoute>
                        } 
                      />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;