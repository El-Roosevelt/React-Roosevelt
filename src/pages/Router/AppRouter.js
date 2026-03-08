import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import MisRutas from "../MisRutas/MisRutas";
import RutasFavoritas from "../RutasFavoritas/RutasFavoritas";
import Mapa from "../Mapa/Mapa";
import ProtectedRoute from "../../components/ProtectedRoute";

import Login from "../../pages/Login/Login";

export default function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login view="iniciar" />} />
                <Route path="/login/registro" element={<Login view="registro" />} />
                <Route path="/login/recuperar" element={<Login view="recuperar" />} />
                <Route path="/my-routes" element={<MisRutas />} />
                <Route path="/fav-routes" element={<RutasFavoritas />} />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
                <Route path="/map" element={<Mapa />} />
            </Routes>

        </>
    )
}