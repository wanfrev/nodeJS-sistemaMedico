import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RecoverPassword.css';
import axios from 'axios';
import { AuthContext } from '../../auth/context/AuthContext';

function RecoverPassword() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  const handleRecoverPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/recover-password', { username });
      alert(response.data.message);
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1 className="forgot-password-title">Recuperar Contraseña</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="forgot-password-input"
          placeholder="Nombre de usuario"
          required
        />
        <button onClick={handleRecoverPassword} className="forgot-password-button">
          Enviar Código de Recuperación
        </button>
        <p className="Reco-prompt">
          Ya tienes Cuenta? <span className="Reco-link" onClick={() => navigate('/auth/login')}>Iniciar Sesion</span>
        </p>
      </div>
    </div>
  );
}

export default RecoverPassword;