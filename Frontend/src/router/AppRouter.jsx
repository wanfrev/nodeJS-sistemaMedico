import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AppRoutes } from '../principal/routes/AppRoutes';
import Register from '../principal/components/Register';
import RecoverPassword from '../principal/components/RecoverPassword';
import ResetPassword from '../principal/components/ResetPassword';
import DoctorInfo from '../principal/components/DoctorInfo'; // Importa el componente DoctorInfo
import { AuthContext } from '../auth/context/AuthContext';

export const AppRouter = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Redirigir la ruta raíz a la página de login */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/auth/login"} />} />
      
      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      
      {/* Register */}
      <Route path="/register" element={<Register />} />
      
      {/* Doctor Info */}
      <Route path="/register/doctor-info" element={<DoctorInfo />} />
      
      {/* Recover Password */}
      <Route path="/recover-password" element={<RecoverPassword />} />
      
      {/* Reset Password */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      {/* App */}
      {isAuthenticated ? (
        <Route path="/*" element={<AppRoutes />} />
      ) : (
        <Route path="/*" element={<Navigate to="/auth/login" />} />
      )}
      
      {/* Redirigir cualquier otra ruta a /auth/login */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};