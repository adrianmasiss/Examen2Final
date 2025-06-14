import React, { useEffect, useState } from "react";
import ResponderPreguntaPopup from "./ResponderPreguntaPopup";
import Estadisticas from "./Estadisticas";

export default function Preguntas({ user }) {
    const [topico, setTopico] = useState("");
    const [preguntas, setPreguntas] = useState([]);
    const [preguntaSel, setPreguntaSel] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [respondidas, setRespondidas] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    const buscar = () => {
        fetch("/api/preguntas?topico=" + encodeURIComponent(topico), {
            headers: { Authorization: "Bearer " + user.token }
        })
            .then(res => res.json())
            .then(data => {
                setPreguntas(data);
                setBusquedaRealizada(true);
            });
    };

    useEffect(() => {
        setPreguntas([]);
        setRespondidas([]);
        setBusquedaRealizada(false);
        fetch("/api/respuestas", {
            headers: { Authorization: "Bearer " + user.token }
        })
            .then(res => res.json())
            .then(data => setRespondidas(data));
    }, [user]);

    useEffect(() => {
        setPreguntas([]);
        setBusquedaRealizada(false); // reset búsqueda al refrescar
    }, [refresh]);

    const mostrarPregunta = (id) => {
        fetch(`/api/preguntas/${id}`, {
            headers: { Authorization: "Bearer " + user.token }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Pregunta no encontrada");
                }
                return res.json();
            })
            .then(data => setPreguntaSel(data))
            .catch(err => alert(err.message));
    };

    return (
        <div className="preguntas-container">
            <Estadisticas user={user} refreshKey={refresh} />
            <div className="busqueda">
                <input
                    placeholder="Buscar por tópico..."
                    value={topico}
                    onChange={e => setTopico(e.target.value)}
                />
                <button onClick={buscar}>Buscar</button>
            </div>
            <div className="lista-preguntas">
                {preguntas.length === 0 && busquedaRealizada && (
                    <div className="sin-preguntas">
                        <div>No hay preguntas para mostrar.</div>
                    </div>
                )}

                {respondidas.length > 0 && (
                    <div className="historial-preguntas">
                        <h4 style={{margin: "24px 0 10px", color: "#555"}}>Preguntas Respondidas:</h4>
                        <div className="tabla-respondidas-wrapper">
                            <table className="tabla-respondidas">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Pregunta</th>
                                    <th>Tópico</th>
                                    <th>Respuesta</th>
                                    <th>Tu Respuesta</th>
                                </tr>
                                </thead>
                                <tbody>
                                {respondidas.map((r, i) => (
                                    <tr key={i} className={r.correcta ? "correcta" : "incorrecta"}>
                                        <td>{i + 1}</td>
                                        <td style={{fontWeight: 500}}>{r.pregunta.texto}</td>
                                        <td>
                                            <span className="tag-topico">{r.pregunta.topico}</span>
                                        </td>
                                        <td>
                                            {r.correcta ? (
                                                <span className="icon-correcta">
                                                        <img src="/correcta.png" alt="Correcta"/>
                                                        Correcta
                                                    </span>
                                            ) : (
                                                <span className="icon-incorrecta">
                                                        <img src="/incorrecta.png" alt="Incorrecta"/>
                                                        Incorrecta
                                                    </span>
                                            )}
                                        </td>
                                        <td>
                                            <span style={{fontWeight: 600}}>{r.opcionTexto}</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {preguntas.length === 0 && !busquedaRealizada && respondidas.length === 0 && (
                    <div className="sin-preguntas">
                        <div>No hay preguntas disponibles.</div>
                    </div>
                )}
                {preguntas.length > 0 && (
                    <ul>
                        {preguntas.map(p => (
                            <li key={p.id} className="pregunta-item">
                                <span>
                                    <strong>{p.texto}</strong>
                                    <em style={{marginLeft: 10, fontSize: "0.9em"}}>
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
