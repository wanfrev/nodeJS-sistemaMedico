import React, { useEffect, useState } from 'react';
import './ConsultQuote.css';

export const ConsultQuote = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/consultQuoteData.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="consult-quote-container">
      <header className="header">
        <h1>Consultar citas</h1>
      </header>
      <main className="main-content">
        <h2>Citas pendientes</h2>
        {data.pendingQuotes.map((quote, index) => (
          <div className="quote-card" key={index}>
            <p className="doctor">Doctor asignado: <span>{quote.doctor}</span></p>
            <p className="reason">Razón de la cita: <strong>{quote.reason}</strong></p>
            <p className="date">Fecha de la cita: <span>{quote.date}</span></p>
            <a href="#" className="view-more">Ver más</a>
          </div>
        ))}
        <div className="empty-quote-card"></div>
        <div className="empty-quote-card"></div>
        <div className="empty-quote-card"></div>
      </main>
    </div>
  );
};