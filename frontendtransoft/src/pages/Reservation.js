import React from "react";
import "./Styles/Reservation.css";
import Navbar from "../components/Navbar/Navbar";
import ReservationForm from "../components/ReservationForm/ReservationForm";
import RechercheSection from "../components/RechercheSection/Recherche";
import Footer from "../components/Footer/Footer";
import Features from "../components/Features/Features";
import SearchResults from "../components/RechercheSection/SearchResults.js"
 

const Reservation = () => {
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

export default Reservation;
