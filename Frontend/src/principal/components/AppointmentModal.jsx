import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentModal.css';

export const AppointmentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Opciones de Citas</h2>
        <button className="modal-button" onClick={() => handleNavigate('/createQuote')}>Crear Cita</button>
        <button className="modal-button" onClick={() => handleNavigate('/consultQuote')}>Consultar Citas</button>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};