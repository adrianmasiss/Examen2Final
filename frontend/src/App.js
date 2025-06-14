import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Inicio from "./components/Inicio";
import LoginPopup from "./components/LoginPopup";
import Preguntas from "./components/Preguntas";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        navigate("/");
    };

    return (
        <div className="app-container">
            <Header user={user} logout={logout} />

            <main>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route
                        path="/preguntas"
                        element={user ? <Preguntas user={user} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginPopup
                                setUser={u => {
                                    setUser(u);
                                    navigate("/preguntas");
                                }}
                                onClose={() => navigate("/")}
                            />
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
