import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    personTypeId: '',
    document_nu: '',
    documentTypeId: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/register',
        formData,
        { withCredentials: true }
      );
      setMessage(response.data.msg);
      login(response.data.userProfile);
      navigate('/auth/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      setMessage(error.response?.data?.msg || 'Error al registrar el usuario.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="register-form-row">
            <div className="register-form-group">
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="documentTypeId">Tipo de Documento:</label>
              <select
                id="documentTypeId"
                name="documentTypeId"
                value={formData.documentTypeId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="1">DNI</option>
                <option value="2">Pasaporte</option>
              </select>
            </div>

            <div className="register-form-group">
              <label htmlFor="document_nu">Número de Documento:</label>
              <input
                type="text"
                id="document_nu"
                name="document_nu"
                value={formData.document_nu}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="sign-up-button">Registrarse</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="login-prompt">
          Ya tienes Cuenta? <span className="login-link" onClick={() => navigate('/auth/login')}>Iniciar Sesion</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;