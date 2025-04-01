 import React, { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import '../styles/Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const barChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{
      label: 'Ventes de billets',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#396E77',
    }]
  };

  const pieChartData = {
    labels: ['Réservations effectuées', 'Réservations annulées'],
    datasets: [{
      data: [75, 25],
      backgroundColor: ['#87CEFA', '#D7B5AA'],
    }]
  };


  interface Reservation {
    reservation_id: number;
    route_id: number;
    status: string;
    seats_reserved: string;
    
  }
  const API_URL = "https://transoftmali.onrender.com/api-transoft/reservation";
  const [reservations, setReservations] = useState<Reservation[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      fetchReservations();
    }, []);

    const fetchReservations = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des réservations");
        }
        const data: Reservation[] = await response.json();
        setReservations(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    const totalReservations = reservations.length;

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card pink">
          <h3 style={{color: 'white'}}>Nombre total de réservations</h3>
          <div className="value">{totalReservations}</div>
        </div>
        <div className="stat-card green">
          <h3 style={{color: 'white'}}>Nombre de trajets</h3>
          <div className="value">89</div>
        </div>
        <div className="stat-card yellow">
          <h3 style={{color: 'white'}}>Taux d'occupation des bus</h3>
          <div className="value">78%</div>
        </div>
        <div className="stat-card blue">
          <h3 style={{color: 'white'}}>Taux de réservations</h3>
          <div className="value">92%</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>Ventes de billets par mois</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart-wrapper">
          <h3>Répartition des réservations</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;