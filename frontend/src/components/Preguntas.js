import React, { useEffect, useState } from "react";
import ResponderPreguntaPopup from "./ResponderPreguntaPopup";
import Estadisticas from "./Estadisticas";

export default function Preguntas({ user }) {
    const [topico, setTopico] = useState("");
    const [preguntas, setPreguntas] = useState([]);
    const [preguntaSel, setPreguntaSel] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [respondidas, setRespondidas] = useState([]);

    // Buscar preguntas (sin opciones)
    const buscar = () => {
        fetch("/api/preguntas?topico=" + encodeURIComponent(topico), {
            headers: { Authorization: "Bearer " + user.token }
        })
            .then(res => res.json())
            .then(data => setPreguntas(data));
    };

    useEffect(() => {
        setPreguntas([]);
        setRespondidas([]);
    }, [user, refresh]);

    // Obtener los datos completos de la pregunta (con opciones) antes de abrir popup
    const mostrarPregunta = (id) => {
        fetch(`/api/preguntas/${id}`, {
            headers: { Authorization: "Bearer " + user.token }
        })
            .then(res => res.json())
            .then(data => setPreguntaSel(data));
    };

    const getRespuestaTexto = resp =>
        resp.correcta
            ? <span style={{ color: "#28a745", fontWeight: 500 }}><img src="/correcta.png" alt="✓" style={{ height: 22, verticalAlign: "middle" }} /> Correcta</span>
            : <span style={{ color: "#e94f37", fontWeight: 500 }}><img src="/incorrecta.png" alt="✗" style={{ height: 22, verticalAlign: "middle" }} /> Incorrecta</span>;

    return (
        <div className="preguntas-container">
            <Estadisticas user={user} />
            <div className="busqueda">
                <input
                    placeholder="Buscar por tópico..."
                    value={topico}
                    onChange={e => setTopico(e.target.value)}
                />
                <button onClick={buscar}>Buscar</button>
            </div>
            <div className="lista-preguntas">
                {preguntas.length === 0 ? (
                    <div className="sin-preguntas">
                        <div>No hay preguntas disponibles.</div>
                        {respondidas.length > 0 && (
                            <div className="historial-preguntas">
                                <h4 style={{ margin: "24px 0 10px", color: "#555" }}>Preguntas Respondidas:</h4>
                                <ul>
                                    {respondidas.map((r, i) => (
                                        <li key={i} className="historial-item">
                                            <strong>{r.pregunta.texto}</strong>
                                            <span style={{ marginLeft: 10, fontStyle: "italic", color: "#888" }}>
                                                ({r.pregunta.topico})
                                            </span>
                                            <span style={{ marginLeft: 18 }}>
                                                {getRespuestaTexto(r)}
                                            </span>
                                            <div style={{ marginLeft: 34, marginTop: 3, fontSize: "0.96em", color: "#444" }}>
                                                Tu respuesta: <b>{r.opcionTexto}</b>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <ul>
                        {preguntas.map(p => (
                            <li key={p.id} className="pregunta-item">
                                <span>
                                    <strong>{p.texto}</strong>
                                    <em style={{ marginLeft: 10, fontSize: "0.9em" }}>
                                        ({p.topico})
                                    </em>
                                </span>
                                <button onClick={() => mostrarPregunta(p.id)}>Responder</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {preguntaSel && (
                <ResponderPreguntaPopup
                    pregunta={preguntaSel}
                    user={user}
                    onClose={() => setPreguntaSel(null)}
                    onRespondido={respuestaData => {
                        setPreguntaSel(null);
                        setPreguntas(prev => prev.filter(p => p.id !== preguntaSel.id));
                        setRespondidas(prev => [
                            ...prev,
                            {
                                pregunta: preguntaSel,
                                correcta: respuestaData.correcta,
                                opcionTexto: respuestaData.opcionTexto
                            }
                        ]);
                        setRefresh(r => !r);
                    }}
                />
            )}
        </div>
    );
}
