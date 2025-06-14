import React, { useState } from "react";

export default function LoginPopup({ setUser, onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) throw new Error("Usuario o clave incorrectos");
            const data = await res.json();
            setUser({ nombre: data.nombre, token: data.token });
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay login-overlay">
            <div className="popup login-popup">
                <button className="close-btn" onClick={onClose}>✖</button>
                <div className="login-header">
                    <img src="/logo.png" alt="Logo" className="login-logo" />
                    <h2>Bienvenido</h2>
                    <span className="login-desc">Inicia sesión para acceder a la autoevaluación</span>
                </div>
                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                    <label>
                        <span className="login-label">Usuario</span>
                        <div className="login-input-wrapper">
                            <span className="login-icon">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" fill="#215e8e"/></svg>
                            </span>
                            <input
                                className="login-input"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                autoFocus
                                autoComplete="username"
                                required
                                placeholder="Tu usuario"
                            />
                        </div>
                    </label>
                    <label>
                        <span className="login-label">Contraseña</span>
                        <div className="login-input-wrapper">
                            <span className="login-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-8h-1V7c0-3.3-2.7-6-6-6S5 3.7 5 7v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V11c0-1.1-.9-2-2-2zm-8-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2H8V7zm10 15H6V11h12v11z" fill="#215e8e"/></svg>
                            </span>
                            <input
                                className="login-input"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                placeholder="Tu contraseña"
                            />
                        </div>
                    </label>
                    <button
                        type="submit"
                        className="submit-btn login-btn"
                        disabled={loading || !username || !password}
                    >
                        {loading ? "Ingresando..." : "Entrar"}
                    </button>
                    {error && <div className="error-msg login-error">{error}</div>}
                </form>
            </div>
        </div>
    );
}
