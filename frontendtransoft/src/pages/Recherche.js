import React from "react";
import Navbar from "../components/Navbar/Navbar";
import RechercheSection from "../components/RechercheSection/Recherche";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import SearchResults from "../components/RechercheSection/SearchResults.js"

const Recherche = () => {
  return (
    <div>
      <Navbar />
      <RechercheSection />
      <SearchResults />
      <Features />
      <Footer />
    </div>
  );
};

export default Recherche;
