import "./NavBar.scss";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  // const link = ({ isActive }) =>
  //   "nav-link text-light fs-5" + (isActive ? " active fw-bold" : "");

  return (
    // <div classNameNameName="d-lg-flex w-100 justify-content-center ">
    //     <ul classNameNameName="container-fluid nav nav-pills nav-fill justify-content-between p-1 bg-secondary">
    //       <li classNameNameName="d-none d-lg-inline nav-item col-2"><NavLink to="/" classNameNameName={link}>
    //       <i classNameName="bi bi-house-door pe-1"></i>
    //        <span classNameNameName="d-none d-lg-inline">Inicio</span></NavLink></li>

    //       <li classNameNameName="d-none d-lg-inline nav-item col-2"><NavLink to="/map" classNameNameName={link}>
    //       <i classNameName="bi bi-globe-americas pe-1"></i>
    //       <span classNameNameName="d-none d-lg-inline">Mapa</span></NavLink></li>

    //       <li classNameNameName="nav-item col-2"><NavLink to="/my-routes" classNameNameName={link}>
    //       <i classNameName="bi bi-geo-alt pe-1"></i>
    //       <span classNameNameName="d-none d-lg-inline">Mis Rutas</span></NavLink></li>

    //       <li classNameNameName="nav-item col-2 text-light"><NavLink to="/fav-routes" classNameNameName={link}>
    //       <i classNameName="bi bi-heart pe-1"></i>
    //       <span classNameNameName="d-none d-lg-inline">Rutas Favoritas</span></NavLink></li>

    //       <li classNameNameName="d-lg-none nav-item col-2"><NavLink to="/map" classNameNameName={link}>
    //       <i classNameName="bi bi-globe-americas pe-1"></i>
    //       <span classNameNameName="d-none d-lg-inline">Mapa</span></NavLink></li>

    //       <li classNameNameName="nav-item col-2 d-lg-none"><NavLink to="/profile" classNameNameName={link}>
    //       <i classNameName="bi bi-person-circle pe-1"></i>
    //       <span classNameNameName="d-none d-lg-inline">Profile</span></NavLink></li>

    //       <li classNameNameName="nav-item d-lg-inline  col-2"><NavLink to="/settings" classNameNameName={link}>
    //       <i classNameName="bi bi-gear pe-1"></i>
    //       <span classNameNameName="d-none d-lg-inline">Configuración</span></NavLink></li>
    //     </ul>
    // </div>
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Features
              </a>
              <a className="nav-link" href="#">
                Pricing
              </a>
              <a
                className="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
