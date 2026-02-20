import "./NavBar.scss";
import { NavLink } from "react-router-dom";

function SideBar() {
  const link = ({ isActive }) =>
    "nav-link text-light  fs-5" + (isActive ? " active fw-bold" : "");

  return (
    <div className="d-lg-flex w-100 justify-content-center">
        <ul className="container-fluid nav nav-pills nav-fill justify-content-between p-1 bg-secondary">
          <li className="nav-item col-2"><NavLink to="/" className={link}>
          <i class="bi bi-house-door pe-1" width="60"></i>
           <span className="d-none d-lg-inline">Inicio</span></NavLink></li>
          <li className="nav-item col-2"><NavLink to="/map" className={link}>
          <i class="bi bi-pin-map pe-1"></i>
          <span className="d-none d-lg-inline">Mapa</span></NavLink></li>
          <li className="nav-item col-2"><NavLink to="/my-routes" className={link}>
          <i class="bi bi-geo-alt pe-1"></i>
          <span className="d-none d-lg-inline">Mis Rutas</span></NavLink></li>
          <li className="nav-item col-2 text-light"><NavLink to="/fav-routes" className={link}>
          <i class="bi bi-heart pe-1"></i>
          <span className="d-none d-lg-inline">Rutas Favoritas</span></NavLink></li>
          <li className="nav-item col-2 d-lg-none"><NavLink to="/settings" className={link}>
          <i class="bi bi-person-circle pe-1"></i>
          <span className="d-none d-lg-inline">Configuración</span></NavLink></li>
          <li className="d-none d-lg-inline nav-item col-2"><NavLink to="/settings" className={link}>
          <i class="bi bi-gear pe-1"></i>
          <span className="d-none d-lg-inline">Configuración</span></NavLink></li>
        </ul>
    </div>
  );
}

export default SideBar;
