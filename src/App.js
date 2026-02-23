import "./App.scss";
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex vh-100 flex-column justify-content-between justify-content-lg-start">
          <Header />
          <NavBar />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
