import React, { useRef, useEffect, useState } from 'react';
import './HomePage.css';
import { ConsultModal } from '../components/ConsultModal.jsx';
import { EditModal } from '../components/EditprofileModal.jsx';
import { ShowDataModal } from '../components/ShowDataUserModal.jsx';

export const HomePage = () => {
  const fileInputRef = useRef(null);
  const [data, setData] = useState(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShowDataModalOpen, setIsShowDataModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleViewMoreClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsConsultModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleShowDataClick = () => {
    setIsShowDataModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsConsultModalOpen(false);
    setIsEditModalOpen(false);
    setIsShowDataModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSavePatient = (updatedPatient) => {
    setData({ ...data, patient: updatedPatient });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage-container">
      <div className="particles"></div>
      <div className="content">
        <div className="left-column">
          <div className="patient-info">
            <h2>Información del Paciente</h2>
            <p>Nombre: {data.patient.name}</p>
            <p>Fecha de Nacimiento: {data.patient.birthDate}</p>
            <p>Edad: {data.patient.age} años</p>
            <div className="patient-options">
              <a href="#" onClick={handleEditClick}>Editar</a> | <a href="#" onClick={handleShowDataClick}>Mostrar datos</a>
            </div>
            <div className="internal-notes">
              <textarea readOnly>{data.patient.notes}</textarea>
            </div>
          </div>
          <div className="files-section">
            <h2>Archivos</h2>
            <ul>
              {data.files.map((file, index) => (
                <li key={index}>{file.name} ({file.size}, fecha: {file.date})</li>
              ))}
            </ul>
            <button onClick={handleFileButtonClick}>Adjuntar archivo</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="center-column">
          <div className="medical-summary">
            <h2>Resumen de historias médicas</h2>
          </div>
          <div className="pending-appointments">
            <h2>Citas Pendientes</h2>
            {data.appointments.map((appointment, index) => (
              <div className="appointment" key={index}>
                <div className="appointment-date">{appointment.date}</div>
                <div className="appointment-details">
                  <p>{appointment.details}</p>
                  <p>Horario: {appointment.time}</p>
                  <p>{appointment.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right-column">
          <div className="appointment-history">
            <h2>Historial de citas</h2>
            {data.appointmentHistory.map((history, index) => (
              <div className="appointment" key={index}>
                <div className="appointment-date">{history.date}</div>
                <div className="appointment-details">
                  <p>{history.details}</p>
                  <p>{history.doctor}</p>
                  <a href="#" onClick={() => handleViewMoreClick(history)}>Ver más</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConsultModal isOpen={isConsultModalOpen} onClose={handleCloseModal} appointment={selectedAppointment} />
      <EditModal isOpen={isEditModalOpen} onClose={handleCloseModal} patient={data.patient} onSave={handleSavePatient} />
      <ShowDataModal isOpen={isShowDataModalOpen} onClose={handleCloseModal} patient={data.patient} />
    </div>
  );
};