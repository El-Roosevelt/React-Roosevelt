import "./App.scss";
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRouter from "./pages/Router/AppRouter";

function App() {
  return (
    <>
    <div className="d-flex flex-column min-vh-100 justify-content-between justify-content-lg-start">
      <BrowserRouter>
          <Header /> 
          <NavBar />
          <main className="flex-grow-1">

                      <AppRouter/>

          </main>
          <Footer />
      </BrowserRouter>      
      </div>
    </>
  );
}

export default App;
