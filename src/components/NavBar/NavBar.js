// import "./NavBar.scss";
// import { NavLink } from "react-router-dom";



// export default function NavBar() {
//   const link = ({ isActive }) =>
//     "nav-link text-light fs-5" + (isActive ? " active fw-bold" : "");


//   return (

//     <>
//       <div className="d-none d-md-flex w-100 justify-content-center ">
//         <ul className="container-fluid nav nav-pills nav-fill justify-content-between p-1 bg-secondary">

//           <li className="nav-item col-2"><NavLink to="/" className={link}>
//             <i className="bi bi-house-door pe-1"></i>
//             <span className="d-none d-lg-inline">Inicio</span></NavLink></li>

//           <li className="nav-item col-2"><NavLink to="/map" className={link}>
//             <i className="bi bi-globe-americas pe-1"></i>
//             <span className="d-none d-lg-inline">Mapa</span></NavLink></li>

//           <li className="nav-item col-2"><NavLink to="/my-routes" className={link}>
//             <i className="bi bi-geo-alt pe-1"></i>
//             <span className="d-none d-lg-inline">Mis Rutas</span></NavLink></li>

//           <li className="nav-item col-2"><NavLink to="/fav-routes" className={link}>
//             <i className="bi bi-heart pe-1"></i>
//             <span className="d-none d-lg-inline">Rutas Favoritas</span></NavLink></li>

//           <li className="nav-item col-2"><NavLink to="/settings" className={link}>
//             <i className="bi bi-gear pe-1"></i>
//             <span className="d-none d-lg-inline">Configuración</span></NavLink></li>

//         </ul>
//       </div>
//       <div className="d-flex w-100 d-md-none">
//         <nav className="w-100 navbar navbar-expand-lg bg-body-tertiary">
//           <div className="container-fluid">
//             <a className="navbar-brand" href="#">Navbar</a>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav">
//                 <li className="nav-item">
//                   <NavLink to="/" className="nav-link">
//                     <i className="bi bi-house-door pe-1"></i>
//                     <span className="d-lg-inline">Inicio</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/map" className="nav-link">
//                     <i className="bi bi-globe-americas pe-1"></i>
//                     <span className="d-lg-inline">Mapa</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/my-routes" className="nav-link">
//                     <i className="bi bi-geo-alt pe-1"></i>
//                     <span className="d-lg-inline">Mis Rutas</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/fav-routes" className="nav-link">
//                     <i className="bi bi-heart pe-1"></i>
//                     <span className="d-lg-inline">Rutas Favoritas</span></NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/settings" className="nav-link">
//                     <i className="bi bi-gear pe-1"></i>
//                     <span className="d-lg-inline">Configuración</span></NavLink>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>

//   );
// }





import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {

    const link = ({ isActive }) =>
        "nav-link text-light fs-5" + (isActive ? " active fw-bold" : "");

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (
        <>
            <div className="d-none d-md-flex w-100 justify-content-center ">
                <ul className="container-fluid nav nav-pills nav-fill justify-content-between p-1 bg-secondary">
                    <li className="d-md-none d-lg-inline nav-item col"><NavLink to="/" className={link}>
                        <i className="bi bi-house-door pe-1"></i>
                        <span className="d-none d-lg-inline">Inicio</span></NavLink></li>

                    <li className="nav-item col"><NavLink to="/map" className={link}>
                        <i className="bi bi-globe-americas pe-1"></i>
                        <span className="d-none d-lg-inline">Mapa</span></NavLink></li>

                    <li className="nav-item col"><NavLink to="/my-routes" className={link}>
                        <i className="bi bi-geo-alt pe-1"></i>
                        <span className="d-none d-lg-inline">Mis Rutas</span></NavLink></li>

                    <li className="nav-item col"><NavLink to="/fav-routes" className={link}>
                        <i className="bi bi-heart pe-1"></i>
                        <span className="d-none d-lg-inline">Rutas Favoritas</span></NavLink></li>
                        
                    <li className="d-md-inline d-lg-none nav-item col"><NavLink to="/login" className={link}>
                        <i class="bi bi-person-circle pe-1"></i>
                        <span className="d-none d-lg-inline">Login</span></NavLink></li>
                    
                    <li className="nav-item col"><NavLink to="/settings" className={link}>
                        <i className="bi bi-gear pe-1"></i>
                        <span className="d-none d-lg-inline">Configuración</span></NavLink></li>

                </ul>
            </div>

            <nav className="d-md-none navbar bg-primary">
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        <span>El Roosevelt</span>
                    </NavLink>

                    <ul className={click ? "nav-menu active bg-primary " : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/login"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                <i class="bi bi-person-circle pe-1"></i>
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/map"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                <i className="bi bi-globe-americas pe-1"></i>
                                Mapa
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/my-routes"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                <i className="bi bi-geo-alt pe-1"></i>
                                Mis Rutas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/fav-routes"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                <i className="bi bi-heart pe-1"></i>
                                Rutas Favoritas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/settings"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                <i className="bi bi-gear pe-1"></i>
                                Configuración
                            </NavLink>
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

                        {click ? (
                            <span className="icon">

                                <i class="bi bi-x-lg fs-1 fw-bold"></i>

                            </span>
                        ) : (
                            <span className="icon">
                                <i class="bi bi-list fs-1 fw-bold"></i>
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
