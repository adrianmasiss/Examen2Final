import React, { useEffect, useState } from "react";

export default function Estadisticas({ user, refreshKey }) {
    const [stats, setStats] = useState({ aciertos: 0, fallos: 0, nota: 0 });

    useEffect(() => {
        fetch("/api/estadisticas", {
            headers: { Authorization: "Bearer " + user.token }
        })
            .then(res => res.json())
            .then(data => setStats(data));
    }, [user, refreshKey]);

    return (
        <div className="estadisticas">
            <span>
                <img src="/correcta.png" alt="Aciertos" style={{height: 26, verticalAlign: "middle", marginRight: 6}} />
                Aciertos: <b>{stats.aciertos}</b>
            </span>
            <span style={{marginLeft: 20}}>
                <img src="/incorrecta.png" alt="Fallos" style={{height: 26, verticalAlign: "middle", marginRight: 6}} />
                Fallos: <b>{stats.fallos}</b>
            </span>
            <span style={{marginLeft: 20}}>
                <img src="/logo.png" alt="Nota" style={{height: 24, verticalAlign: "middle", marginRight: 6, opacity: 0.7}} />
                Nota: <b>{stats.nota}</b>
            </span>
        </div>
    );
}
