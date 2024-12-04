import { Navigate, Route, Routes } from "react-router-dom"
import { SidebarComponent } from "../components/SidebarComponent"
import {HomePage, CreateQuote, MedicalHistory, Medications, ConsultQuote} from '../pages'

export const AppRoutes = () => {
  return (
    <>
      <SidebarComponent/>
      <div className="container">
        <Routes>
        <Route path="home" element={<HomePage />}/>
          <Route path="createQuote" element={<CreateQuote />}/>
          <Route path="medicalHistory" element={<MedicalHistory />}/>
          <Route path="medications" element={<Medications />}/>
            <Route path="consultQuote" element={<ConsultQuote />}/>
          <Route path="/*" element={<Navigate to="/home" />}/>
        </Routes>
      </div>
    </>
  )
}
