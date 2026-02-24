import "./App.scss";
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
    <div className="d-flex flex-column vh-100 justify-content-between justify-content-lg-start">
      <BrowserRouter>
          <Header />
          <NavBar />

          <Footer />
      </BrowserRouter>
      
      </div>
    </>
  );
}

export default App;
