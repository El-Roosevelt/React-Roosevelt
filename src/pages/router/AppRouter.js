import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import MisRutas from "../MisRutas/MisRutas";

export default function AppRouter(){
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-routes" element={<MisRutas />} />
            </Routes>

        </>
    )
}