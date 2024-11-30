import { useState } from 'react';
import axios from 'axios';

function RecoverPassword() {
  const [username, setUsername] = useState('');

  const handleRecoverPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/recover-password', { username });
      alert(response.data.message);
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Recuperar Contraseña</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
      />
      <button onClick={handleRecoverPassword}>Enviar Código de Recupción</button>
    </div>
  );
}

export default RecoverPassword;