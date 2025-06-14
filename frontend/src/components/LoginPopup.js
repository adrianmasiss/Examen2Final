import React, { useState } from "react";

export default function LoginPopup({ setUser, onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
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
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-btn" onClick={onClose}>✖</button>
                <h2>Ingresar</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuario:
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-btn">Entrar</button>
                </form>
                {error && <div className="error-msg">{error}</div>}
            </div>
        </div>
    );
}
