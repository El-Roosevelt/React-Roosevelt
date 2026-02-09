import "./Header.scss";

function Header() {
  return (
    <header>
      <div class="container-fluid d-flex justify-content-between m-0 p-0 bg-primary text-light">
        <div
          class="d-flex align-items-center px-2 bg-primary"
          id="toggleSidebar"
        >
          <svg
            id="menu-button"
            xmlns="http://www.w3.org/2000/svg"
            width="106"
            height="106"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
        <div class="d-flex justify-content-center align-content-center align-items-center p-3">
          <img class="img-logo " src="/logo.png" alt="logo.png" />
        </div>
        <div class="d-flex align-items-center profile-menu-container px-2 bg-primary text-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
            onclick="toggleMenu()"
            id="btnProfile"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          <div class="profile-menu" id="profileMenu">
            <a href="#">Perfil</a>
            <a href="#">Cambiar Cuenta</a>
            <a href="#">
              Cerrar sesión
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-door-open"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
