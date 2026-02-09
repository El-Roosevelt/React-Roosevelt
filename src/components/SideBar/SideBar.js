import './SideBar.scss';

function SideBar() {
    return (
  <div class="container-fluid p-0 d-flex text-center">
    <div class="d-flex flex-column bg-body-tertiary sidebar" id="sidebar">
      <ul class="nav nav-pills flex-column vh-100">
        <li class="nav-item">
          <div class="">
            <span class="m-5">Menu</span>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link active py-3 border-bottom rounded-0 text-black" data-bs-toggle="tab"
            data-bs-target="#home">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-door"
              viewBox="0 0 16 16">
              <path
                d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
            <span>Inicio</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link py-3 border-bottom rounded-0 text-black" data-bs-toggle="tab"
            data-bs-target="#mapa">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-compass"
              viewBox="0 0 16 16">
              <path
                d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
            </svg>
            <span>Mapa</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link py-3 border-bottom rounded-0 text-black" data-bs-toggle="tab" data-bs-target="#crear_ruta
    ">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-geo"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
            </svg>
            <span>Crear Ruta</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link py-3 border-bottom rounded-0 text-black" data-bs-toggle="tab" data-bs-target="#mis_rutas
    ">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list-task"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
              <path
                d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
              <path fill-rule="evenodd"
                d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
            </svg>
            <span>Mis rutas</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link py-3 border-bottom rounded-0 text-black" data-bs-toggle="tab" data-bs-target="#favoritas
    ">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart"
              viewBox="0 0 16 16">
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
            <span>Favoritas</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link py-3 border-bottom rounded-0 text-black" data-bs-toggle="tab" data-bs-target="#configuracion
    ">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-gear"
              viewBox="0 0 16 16">
              <path
                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
              <path
                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
            </svg>
            <span>Configuración</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="tab-content w-100 p-4">
      <div class="tab-pane fade show active" id="home">
        <h1>Home content</h1>
        <p>Welcome to the Home section.</p>
      </div>
      <div class="tab-pane fade show" id="mapa">
        <h1>Mapa content</h1>
        <p>Welcome to the Mapa section.</p>
      </div>
      <div class="tab-pane fade show" id="crear_ruta">
        <h1>Crear ruta content</h1>
        <p>Welcome to the Crear ruta section.</p>
      </div>
      <div class="tab-pane fade show" id="mis_rutas">
        <h1>Mis rutas content</h1>
        <p>Welcome to the mis_rutas section.</p>
      </div>
      <div class="tab-pane fade show" id="favoritas">
        <h1>Favoritas content</h1>
        <p>Welcome to the mis_rutas section.</p>
      </div>
      <div class="tab-pane fade show" id="configuracion">
        <h1>Configuracion content</h1>
        <p>Welcome to the mis_rutas section.</p>
      </div>
    </div>
  </div>
    );
}

export default SideBar;