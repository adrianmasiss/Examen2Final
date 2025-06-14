import React, { useState } from "react";
import RespuestaFeedback from "./RespuestaFeedback";

export default function ResponderPreguntaPopup({ pregunta, user, onClose, onRespondido }) {
    const [seleccionada, setSeleccionada] = useState(null); // SOLO UNA
    const [feedback, setFeedback] = useState(null);

    if (!pregunta || !Array.isArray(pregunta.opciones)) {
        return (
            <div className="popup-overlay">
                <div className="popup">
                    <div style={{ textAlign: "center", padding: 40 }}>
                        <img src="/logo.png" alt="Cargando" style={{ height: 60, marginBottom: 20, opacity: 0.7 }} />
                        <div style={{ fontSize: 18, color: "#1e354c" }}>Cargando pregunta...</div>
                    </div>
                </div>
            </div>
        );
    }

    const responder = async (e) => {
        e.preventDefault();
        if (!seleccionada) return; // No dejes enviar si no eligió nada
        try {
            const res = await fetch(`/api/preguntas/${pregunta.id}/responder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token
                },
                body: JSON.stringify({ seleccionada }) // solo el id
            });
            if (!res.ok) {
                throw new Error("No se pudo registrar la respuesta");
            }
            const data = await res.json();
            setFeedback(data.correcta); // true si la respuesta fue correcta
            const opcionTexto = pregunta.opciones.find(op => op.id === seleccionada)?.texto || "";
            if (onRespondido) onRespondido({ ...data, opcionTexto });
        } catch (err) {
            setFeedback(false);
        }
    };

    if (feedback !== null) {
        return <RespuestaFeedback correcta={feedback} onClose={onClose} />;
    }

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-btn" onClick={onClose}>✖</button>
                <h2>{pregunta.texto}</h2>
                <form onSubmit={responder}>
                    {pregunta.opciones.map((op, idx) => (
                        <label key={op.id || idx} style={{ display: 'block', margin: "10px 0" }}>
                            <input
                                type="radio"
                                name="opcion"
                                checked={seleccionada === op.id}
                                onChange={() => setSeleccionada(op.id)}
                                required
                            />
                            {op.texto}
                        </label>
                    ))}
                    <button className="submit-btn" style={{ marginTop: 18 }} disabled={seleccionada == null}>
                        Enviar Respuesta
                    </button>
                </form>
            </div>
        </div>
    );
}
