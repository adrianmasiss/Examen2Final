import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ user, logout }) {
    const navigate = useNavigate();
    return (
        <header
            className="header"
            style={{
                background: "linear-gradient(90deg, #1e354c, #2b4f6c)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 32px",
                boxShadow: "0 2px 8px #0002",
                borderBottom: "4px solid #e94f37"
            }}
        >
            {/* Logo e Identidad */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="logo"
                    style={{ height: 42, borderRadius: 8, background: "#fff" }}
                />
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
                    Autoevaluación
                </span>
            </div>
            {/* Navegación */}
            <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Link className="login-btn" style={{ fontWeight: 500 }} to="/">
                    Inicio
                </Link>
                {user && (
                    <>
                        <Link
                            className="login-btn"
                            style={{ fontWeight: 500 }}
                            to="/preguntas"
                        >
                            Preguntas
                        </Link>
                        <span
                            className="usuario"
                            style={{
                                margin: "0 16px",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                gap: 7
                            }}
                        >
                            <img
                                src="/user.png"
                                alt="Avatar"
                                style={{
                                    height: 32,
                                    width: 32,
                                    verticalAlign: "middle",
                                    borderRadius: "50%",
                                    background: "#fff"
                                }}
                            />
                            {user.nombre}
                        </span>
                        <button
                            className="logout-btn"
                            style={{ fontWeight: 500 }}
                            onClick={logout}
                        >
                            Salir
                        </button>
                    </>
                )}
                {!user && (
                    <button
                        className="login-btn"
                        style={{ fontWeight: 500 }}
                        onClick={() => navigate("/login")}
                    >
                        Ingresar
                    </button>
                )}
            </nav>
        </header>
    );
}