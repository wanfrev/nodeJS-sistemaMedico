import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DoctorInfo = () => {
  const location = useLocation();
  const userId = location.state?.userId || ''; // Obtener el userId del estado de navegación

  const [doctorData, setDoctorData] = useState({
    userId: userId,
    licenseNumber: '',
    specialty: '',
    yearsOfExperience: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', doctorData);

    try {
      const response = await axios.post(
        'http://localhost:3000/register/doctor-info',
        doctorData,
        { withCredentials: true }
      );
      setMessage(response.data.msg);
    } catch (error) {
      console.error('Error al registrar:', error);
      setMessage(error.response?.data?.msg || 'Error al registrar la información del médico.');
    }
  };

  return (
    <div className="doctor-info-container">
      <h1>Información Adicional del Médico</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="licenseNumber">Número de Licencia:</label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={doctorData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialty">Especialidad:</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={doctorData.specialty}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearsOfExperience">Años de Experiencia:</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={doctorData.yearsOfExperience}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DoctorInfo;