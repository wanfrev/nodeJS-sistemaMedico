import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css'; // Asegúrate de importar el archivo CSS
import logo from '../../img/Screenshot 2024-11-14 120807.png'; // Importa tu imagen

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isToastActive, setIsToastActive] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (error && !isToastActive) {
      setIsToastActive(true);
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        onClose: () => setIsToastActive(false),
      });
    }
  }, [error, isToastActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        credentials: 'include', // Enviar cookies para establecer sesión
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          login(data.userProfile); // Actualizar el estado de autenticación con el perfil del usuario
          navigate('/home'); // Redirigir a la página de inicio
        } else {
          setError(data.error || 'Error desconocido');
        }
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-card">
        <img src={logo} alt="MediSalud Logo" className="login-logo" /> {/* Añade la imagen aquí */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">Recuérdame</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3">
          <p className="link-container">
            <button className=" btn-link-login" onClick={() => navigate('/register')}>Registrarse</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;