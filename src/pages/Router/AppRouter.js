import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import MisRutas from "../MisRutas/MisRutas";

export default function AppRouter(){
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-routes" element={<MisRutas />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>

        </>
    )
}