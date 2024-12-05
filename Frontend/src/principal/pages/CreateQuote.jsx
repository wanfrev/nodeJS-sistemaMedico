import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateQuote.css';

export const CreateQuote = () => {
  const [formData, setFormData] = useState({
    hora: '',
    fecha: '',
    personaId: '',
    doctorId: '',
    departamentoId: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/cita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.code === 0) {
        setSuccessMessage('Cita creada exitosamente');
        setErrorMessage('');
        navigate('/home'); // Navega al inicio tras el éxito
      } else {
        setErrorMessage(result.message || 'Error al crear la cita');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-quote-container">
      <header className="header">
        <h1>Crear Cita</h1>
      </header>
      <form className="quote-form" onSubmit={handleSubmit}>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Persona ID:</label>
          <input
            type="number"
            name="personaId"
            value={formData.personaId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor ID:</label>
          <input
            type="number"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Departamento ID:</label>
          <input
            type="number"
            name="departamentoId"
            value={formData.departamentoId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Cita</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};
