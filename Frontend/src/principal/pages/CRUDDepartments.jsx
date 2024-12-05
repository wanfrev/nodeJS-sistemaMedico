import { useState, useEffect } from 'react';
import axios from 'axios';

export const CRUDDepartments = () => {
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments'); // Asegúrate de que este endpoint esté configurado
        setDepartments(response.data);
      } catch (error) {
        console.error('Error al obtener departamentos', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleCreateDepartment = async () => {
    if (department) {
      try {
        await axios.post('/api/departments', { name: department });
        setDepartments([...departments, { name: department }]);
        setDepartment('');
      } catch (error) {
        console.error('Error al crear departamento', error);
      }
    }
  };

  const handleDeleteDepartment = async (name) => {
    try {
      await axios.delete(`/api/departments/${name}`);
      setDepartments(departments.filter((d) => d.name !== name));
    } catch (error) {
      console.error('Error al eliminar departamento', error);
    }
  };

  return (
    <div>
      <h3>Gestión de Departamentos</h3>

      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="Nuevo Departamento"
      />
      <button onClick={handleCreateDepartment} className="btn btn-success">Crear Departamento</button>

      <ul>
        {departments.map((dep, index) => (
          <li key={index}>
            {dep.name} 
            <button className="btn btn-danger" onClick={() => handleDeleteDepartment(dep.name)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
