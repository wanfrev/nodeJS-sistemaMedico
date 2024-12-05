import { useState, useEffect } from 'react';
import axios from 'axios';

export const CRUDSpecialties = () => {
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('/api/specialties'); // Asegúrate de que este endpoint esté configurado en tu backend
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error al obtener especialidades', error);
      }
    };

    fetchSpecialties();
  }, []);

  const handleCreateSpecialty = async () => {
    if (specialty) {
      try {
        await axios.post('/api/specialties', { name: specialty });
        setSpecialties([...specialties, { name: specialty }]);
        setSpecialty('');
      } catch (error) {
        console.error('Error al crear especialidad', error);
      }
    }
  };

  const handleDeleteSpecialty = async (name) => {
    try {
      await axios.delete(`/api/specialties/${name}`);
      setSpecialties(specialties.filter((s) => s.name !== name));
    } catch (error) {
      console.error('Error al eliminar especialidad', error);
    }
  };

  return (
    <div>
      <h3>Gestión de Especialidades</h3>

      <input
        type="text"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        placeholder="Nueva Especialidad"
      />
      <button onClick={handleCreateSpecialty} className="btn btn-success">Crear Especialidad</button>

      <ul>
        {specialties.map((spec, index) => (
          <li key={index}>
            {spec.name} 
            <button className="btn btn-danger" onClick={() => handleDeleteSpecialty(spec.name)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
