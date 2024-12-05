import { useState, useEffect } from 'react';

export const AssignPermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer una solicitud a tu backend para obtener los permisos
    setPermissions([
      { id: 1, name: 'Acceso a Citas' },
      { id: 2, name: 'Gestión de Usuarios' },
      { id: 3, name: 'Acceso a Medicamentos' },
    ]);
  }, []);

  const handleAssignPermission = (userId, permissionId) => {
    // Lógica para asignar el permiso
    console.log(`Asignar permiso ${permissionId} al usuario ${userId}`);
  };

  return (
    <div>
      <h3>Asignar Permisos</h3>
      <select onChange={(e) => setUser(e.target.value)} defaultValue="">
        <option value="" disabled>Selecciona un Usuario</option>
        {/* Aquí deberías mapear los usuarios desde tu base de datos */}
        <option value="1">Usuario 1</option>
        <option value="2">Usuario 2</option>
      </select>
      
      {user && (
        <>
          <h4>Permisos de Usuario</h4>
          {permissions.map(permission => (
            <div key={permission.id}>
              <input
                type="checkbox"
                id={`permission-${permission.id}`}
                onChange={() => handleAssignPermission(user, permission.id)}
              />
              <label htmlFor={`permission-${permission.id}`}>{permission.name}</label>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
