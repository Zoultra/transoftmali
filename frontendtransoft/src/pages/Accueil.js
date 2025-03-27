import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Accueil from "../components/Accueil/Accueil";
import Companies from "../components/Compagnies/Companies";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import SearchResults from "../components/RechercheSection/SearchResults.js"
import RechercheSection from "../components/RechercheSection/Recherche";


// import FormInscription from "../components/FormInscription";
const AccueilSection = () => {
  return (
    <div>
      <Navbar />
      <Accueil />
      <Companies />
      <Features />
      <Footer />
    </div>
  );
};

export default AccueilSection;
