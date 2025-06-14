import React, { useState } from "react";
import Inicio from "./components/Inicio";
import LoginPopup from "./components/LoginPopup";
import Preguntas from "./components/Preguntas";
import Header from "./components/Header";

export default function App() {
    const [user, setUser] = useState(null);
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [pagina, setPagina] = useState("inicio");

    const logout = () => {
        setUser(null);
        setPagina("inicio");
    };

    return (
        <div className="app-container">
            {/* Header bonito con logo, usuario/avatar y navegación */}
            <Header
                user={user}
                setPagina={setPagina}
                setMostrarLogin={setMostrarLogin}
                logout={logout}
            />

            <main>
                {pagina === "inicio" && <Inicio />}
                {pagina === "preguntas" && user && <Preguntas user={user} />}
            </main>

            {/* Popup de login */}
            {mostrarLogin && (
                <LoginPopup
                    setUser={user => {
                        setUser(user);
                        setMostrarLogin(false);
                        setPagina("preguntas");
                    }}
                    onClose={() => setMostrarLogin(false)}
                />
            )}
        </div>
    );
}
