import { Link, useNavigate } from "react-router-dom";

export default function Header({ user, logout }) {
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="header-content">
                {/* Izquierda: Logo y Título */}
                <div className="header-logo-title">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="logo"
                        style={{ height: 46 }}
                    />
                    <span className="header-title">Autoevaluación</span>
                </div>
                {/* Derecha: Navegación */}
                <nav className="header-nav">
                    <Link className="nav-btn" to="/">Inicio</Link>
                    {user && (
                        <>
                            <Link className="nav-btn" to="/preguntas">Preguntas</Link>
                            <span className="usuario">
                                <img src="/user.png" alt="Avatar" />
                                {user.nombre}
                            </span>
                            <button className="nav-btn" onClick={logout}>Salir</button>
                        </>
                    )}
                    {!user && (
                        <button className="nav-btn" onClick={() => navigate("/login")}>
                            Ingresar
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}
