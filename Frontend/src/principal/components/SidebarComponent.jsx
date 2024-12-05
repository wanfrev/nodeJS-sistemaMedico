import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { AppointmentModal } from "../components/AppointmentModal"; 
import { getSidebarItems } from "../components/Sidebaritem"; // Importar el archivo con las rutas

export const SidebarComponent = () => {
  const navigate = useNavigate();
  const { userProfile } = useContext(AuthContext); // Obtener el perfil del usuario
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        console.log('Sesión cerrada correctamente');
        navigate('/auth/login'); // Redirigir al login
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  // Obtener los elementos de la sidebar según el perfil
  const sidebarItems = getSidebarItems(userProfile, setIsModalOpen);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Medi+Linktech</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Medi+Linktech</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {sidebarItems.map((item, index) => (
                  <li key={index} className="nav-item">
                    {item.onClick ? (
                      <a className="nav-link" href="#" onClick={item.onClick}>{item.label}</a>
                    ) : (
                      <Link className="nav-link" to={item.to}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
              <form className="d-flex mt-3" role="search">
                <a className="btn btn-danger" onClick={handleLogout}>Log Out</a>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
