import React from 'react';
import './Modal.css';

export const ConsultModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles de la cita</h2>
        <p><strong>Fecha:</strong> {appointment.date}</p>
        <p><strong>Detalles:</strong> {appointment.details}</p>
        <p><strong>Doctor:</strong> {appointment.doctor}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};