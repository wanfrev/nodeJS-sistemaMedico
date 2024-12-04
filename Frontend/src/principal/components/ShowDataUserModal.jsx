import React from 'react';
import './Modal.css';

export const ShowDataModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Información Completa del Paciente</h2>
        <p><strong>Nombre:</strong> {patient.name}</p>
        <p><strong>Fecha de Nacimiento:</strong> {patient.birthDate}</p>
        <p><strong>Edad:</strong> {patient.age} años</p>
        <p><strong>Notas:</strong> {patient.notes}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};