import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CRUDUserProfiles = () => {
  const [userProfile, setUserProfile] = useState('');
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await axios.get('/api/userProfiles'); // Asegúrate de que este endpoint esté configurado
        setUserProfiles(response.data);
      } catch (error) {
        console.error('Error al obtener perfiles de usuario', error);
      }
    };

    fetchUserProfiles();
  }, []);

  const handleCreateUserProfile = async () => {
    if (userProfile) {
      try {
        await axios.post('/api/userProfiles', { name: userProfile });
        setUserProfiles([...userProfiles, { name: userProfile }]);
        setUserProfile('');
      } catch (error) {
        console.error('Error al crear perfil de usuario', error);
      }
    }
  };

  const handleDeleteUserProfile = async (name) => {
    try {
      await axios.delete(`/api/userProfiles/${name}`);
      setUserProfiles(userProfiles.filter((up) => up.name !== name));
    } catch (error) {
      console.error('Error al eliminar perfil de usuario', error);
    }
  };

  return (
    <div>
      <h3>Gestión de Perfiles de Usuario</h3>

      <input
        type="text"
        value={userProfile}
        onChange={(e) => setUserProfile(e.target.value)}
        placeholder="Nuevo Perfil de Usuario"
      />
      <button onClick={handleCreateUserProfile} className="btn btn-success">Crear Perfil</button>

      <ul>
        {userProfiles.map((profile, index) => (
          <li key={index}>
            {profile.name} 
            <button className="btn btn-danger" onClick={() => handleDeleteUserProfile(profile.name)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
