import "./NavBar.scss";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const link = ({ isActive }) =>
    "nav-link text-light fs-5" + (isActive ? " active fw-bold" : "");

  return (
    <div className="d-lg-flex w-100 justify-content-center">
        <ul className="container-fluid nav nav-pills nav-fill justify-content-between p-1 bg-secondary">
          
          <li className="d-none d-lg-inline nav-item col-2"><NavLink to="/" className={link}>
          {/* class заменен на className */}
          <i className="bi bi-house-door pe-1"></i>
           <span className="d-none d-lg-inline">Inicio</span></NavLink></li>

          <li className="d-none d-lg-inline nav-item col-2"><NavLink to="/map" className={link}>
          <i className="bi bi-globe-americas pe-1"></i>
          <span className="d-none d-lg-inline">Mapa</span></NavLink></li>

          <li className="nav-item col-2"><NavLink to="/my-routes" className={link}>
          <i className="bi bi-geo-alt pe-1"></i>
          <span className="d-none d-lg-inline">Mis Rutas</span></NavLink></li>

          <li className="nav-item col-2 text-light"><NavLink to="/fav-routes" className={link}>
          <i className="bi bi-heart pe-1"></i>
          <span className="d-none d-lg-inline">Rutas Favoritas</span></NavLink></li>

          <li className="d-lg-none nav-item col-2"><NavLink to="/map" className={link}>
          <i className="bi bi-globe-americas pe-1"></i>
          <span className="d-none d-lg-inline">Mapa</span></NavLink></li>

          <li className="nav-item col-2 d-lg-none"><NavLink to="/profile" className={link}>
          <i className="bi bi-person-circle pe-1"></i>
          <span className="d-none d-lg-inline">Profile</span></NavLink></li>

          <li className="nav-item d-lg-inline  col-2"><NavLink to="/settings" className={link}>
          <i className="bi bi-gear pe-1"></i>
          <span className="d-none d-lg-inline">Configuración</span></NavLink></li>
          
        </ul>
    </div>
  );
}