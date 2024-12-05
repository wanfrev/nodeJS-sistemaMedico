import { Navigate, Route, Routes } from "react-router-dom"
import { SidebarComponent } from "../components/SidebarComponent"
import {HomePage, CreateQuote, MedicalHistory, Medications, ConsultQuote, SecurityPage,CRUDSpecialties, CRUDDepartments, CRUDEmployees, CRUDUserProfiles  } from '../pages'
import {  } from "../pages/CRUDDepartments"

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
          <Route path="security" element={<SecurityPage />}/>
          <Route path="specialities" element={<CRUDSpecialties />}/>
          <Route path="departaments" element={<CRUDDepartments />}/>
          <Route path="employees" element={<CRUDEmployees />}/>
          <Route path="userProfiles" element={<CRUDUserProfiles />}/>
          <Route path="/*" element={<Navigate to="/home" />}/>
        </Routes>
      </div>
    </>
  )
}
