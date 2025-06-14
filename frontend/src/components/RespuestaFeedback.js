import React from "react";
export default function RespuestaFeedback({ correcta, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup" style={{ textAlign: "center" }}>
                <h2 className="mensaje-respuesta">
                    {correcta ? "\u00a1Respuesta correcta!" : "Respuesta incorrecta"}
                </h2>
                <button className="submit-btn" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
