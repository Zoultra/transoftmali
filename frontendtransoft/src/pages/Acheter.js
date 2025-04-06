import React from "react";
// import "./Styles/Reservation.css";
import Navbar from "../components/Navbar/Navbar";
import Reserver from "../components/ReservationForm/Reserver"
import Footer from "../components/Footer/Footer";

 

const Reservation = () => {
  return (
    <div>
      <Navbar />
        <Reserver />
      <Footer />
    </div>
  );
};

export default Reservation;
