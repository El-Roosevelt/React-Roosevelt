import "./App.scss";
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './../node_modules/bootstrap/dist/js/bootstrap.esm.js'
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRouter from "./pages/Router/AppRouter";

function App() {
  return (
    <>

      <BrowserRouter>
        <Header />
        <NavBar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
