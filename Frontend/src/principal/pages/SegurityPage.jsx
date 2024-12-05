import { useState } from 'react';
import { AssignPermissions } from './AssignPermissions.jsx'; // Componente para asignar permisos
import { CRUDSpecialties } from './CRUDSpecialties.jsx'; // Componente para CRUD de especialidades
import { CRUDDepartments } from './CRUDDepartments.jsx'; // Componente para CRUD de departamentos
import { CRUDEmployees } from './CRUDEmployees.jsx'; // Componente para CRUD de empleados
import { CRUDUserProfiles } from './CRUDUserProfiles.jsx'; // Componente para CRUD de perfiles de usuario

export const SecurityPage = () => {
  // Estado para controlar cuál sección está activa
  const [activeTab, setActiveTab] = useState('permissions');

  // Función para cambiar entre las diferentes secciones
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="security-page">
      <h2>Panel de Seguridad</h2>

      {/* Barra de navegación de tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'permissions' ? 'active' : ''}`} onClick={() => handleTabChange('permissions')}>Asignar Permisos</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'specialties' ? 'active' : ''}`} onClick={() => handleTabChange('specialties')}>Especialidades</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'departments' ? 'active' : ''}`} onClick={() => handleTabChange('departments')}>Departamentos</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => handleTabChange('employees')}>Empleados</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'userProfiles' ? 'active' : ''}`} onClick={() => handleTabChange('userProfiles')}>Perfiles de Usuario</a>
        </li>
      </ul>

      {/* Mostrar el contenido de la sección activa */}
      <div className="tab-content mt-3">
        {activeTab === 'permissions' && <AssignPermissions />}
        {activeTab === 'specialties' && <CRUDSpecialties />}
        {activeTab === 'departments' && <CRUDDepartments />}
        {activeTab === 'employees' && <CRUDEmployees />}
        {activeTab === 'userProfiles' && <CRUDUserProfiles />}
      </div>
    </div>
  );
};
