import { useEffect, useState } from 'react';
import './ConsultQuote.css';

export const ConsultQuote = () => {
  const [citas, setCitas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/cita')
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          setCitas(data.data);
        } else {
          setErrorMessage(data.message || 'Error al obtener las citas');
        }
      })
      .catch((error) => {
        setErrorMessage('Error al conectar con el servidor');
      });
  }, []);

  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }

  return (
    <div className="consult-quote-container">
      <header>
        <h1>Listado de Citas</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Departamento</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.appointment_id}>
              <td>{cita.appointment_id}</td>
              <td>{cita.appointment_dt}</td>
              <td>{cita.appointment_hr}</td>
              <td>{cita.patient_name}</td>
              <td>{cita.doctor_name}</td>
              <td>{cita.department_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
