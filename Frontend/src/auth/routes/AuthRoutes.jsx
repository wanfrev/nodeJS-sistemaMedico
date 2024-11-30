import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import Register from "../../principal/components/Register"
import ResetPassword from "../../principal/components/ResetPassword"
import RecoverPassword from "../../principal/components/RecoverPassword"

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />}/>
      {/* Aqui el register y el escribio su contrasenia */}
      <Route path="register" element={<Register />}/>
      <Route path="recover-password" element={<RecoverPassword />}/>
      <Route path="reset-password/:token" element={<ResetPassword />}/>
      <Route path="/*" element={<Navigate to="/auth/login" />}/>
    </Routes>
  )
}
