import "./Header.scss";

function Header() {
  const logo = "/assets/logo.png";
  return (
    <header className="row bg-primary py-3">
      <div className="col-12 col-lg-6  align-content-center">
        <div className="d-flex h-lg-100 w-lg-50 justify-content-center justify-content-lg-start px-3">
          <img className="image-thumbnail" src={logo} alt="logo"></img>
        </div>
      </div>
      <div className="col-lg-6 align-self-stretch">
        <div className="d-none d-lg-flex h-100 justify-content-end align-items-center text-light px-3">
          <div className="dropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="currentColor"
              className="bi bi-person-circle dropdown-toggle"
              data-bs-toggle="dropdown"
              viewBox="0 0 16 16"
              id="btnProfile"
              rol="button"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Login
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Registrarse
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Recuperar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
