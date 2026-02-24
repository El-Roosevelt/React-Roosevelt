import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";

import LoginForm from "../../components/LoginForm/LoginForm";

export default function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/LoginForm" element={<LoginForm />} />
            </Routes>

        </>
    )
}