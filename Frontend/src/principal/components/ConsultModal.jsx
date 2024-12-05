// ConsultModal.jsx
import PropTypes from 'prop-types';
import '../Styles/Modal.css';

export const ConsultModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles de la Cita</h2>
        <p><strong>Fecha:</strong> {appointment.appointment_dt}</p>
        <p><strong>Detalles:</strong> {appointment.details}</p>
        <p><strong>Horario:</strong> {appointment.appointment_hr}</p>
        <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

ConsultModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.object,
};