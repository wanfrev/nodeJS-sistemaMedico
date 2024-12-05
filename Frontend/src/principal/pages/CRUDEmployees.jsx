import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CRUDEmployees = () => {
  const [employee, setEmployee] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees'); // Asegúrate de que este endpoint esté configurado
        setEmployees(response.data);
      } catch (error) {
        console.error('Error al obtener empleados', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleCreateEmployee = async () => {
    if (employee) {
      try {
        await axios.post('/api/employees', { name: employee });
        setEmployees([...employees, { name: employee }]);
        setEmployee('');
      } catch (error) {
        console.error('Error al crear empleado', error);
      }
    }
  };

  const handleDeleteEmployee = async (name) => {
    try {
      await axios.delete(`/api/employees/${name}`);
      setEmployees(employees.filter((e) => e.name !== name));
    } catch (error) {
      console.error('Error al eliminar empleado', error);
    }
  };

  return (
    <div>
      <h3>Gestión de Empleados</h3>

      <input
        type="text"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
        placeholder="Nuevo Empleado"
      />
      <button onClick={handleCreateEmployee} className="btn btn-success">Crear Empleado</button>

      <ul>
        {employees.map((emp, index) => (
          <li key={index}>
            {emp.name} 
            <button className="btn btn-danger" onClick={() => handleDeleteEmployee(emp.name)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
