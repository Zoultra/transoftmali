 

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recherche from "./pages/Recherche";
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import About from './pages/About';
import Inscription from "./pages/Inscription";
import Accueil from "./pages/Accueil";
import { AuthProvider } from '../src/components/Security/AuthContext';
import ReservationForm from "./components/ReservationForm/ReservationForm";
// import Reserver from "./components/ReservationForm/Reserver";
import Acheter from "./pages/Acheter"

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route>
          {/* <Inscription /> */}
          <Route path="/reserver" element={<ReservationForm />} />
          <Route path="/achat" element={<Acheter />} />
          <Route path="/connexion" element={<Inscription />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/recherche" element={<Recherche />} />
          {/* path="*" fonctionne si jamais on ajoute l'url ne correspond a rien de declarer au dessous  */}
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Accueil />} />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
};

export default App;