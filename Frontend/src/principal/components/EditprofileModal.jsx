import React, { useState } from 'react';
import '../Styles/Modal.css';

export const EditModal = ({ isOpen, onClose, patient, onSave }) => {
  const [editedPatient, setEditedPatient] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const handleSave = () => {
    onSave(editedPatient);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Información del Paciente</h2>
        <label>Nombre:</label>
        <input type="text" name="name" value={editedPatient.name} onChange={handleChange} />
        <label>Fecha de Nacimiento:</label>
        <input type="text" name="birthDate" value={editedPatient.birthDate} onChange={handleChange} />
        <label>Edad:</label>
        <input type="number" name="age" value={editedPatient.age} onChange={handleChange} />
        <label>Notas:</label>
        <textarea name="notes" value={editedPatient.notes} onChange={handleChange}></textarea>
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};