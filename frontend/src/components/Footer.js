import React from "react";

export default function Footer() {
    return (
        <footer className="main-footer">
            &copy; {new Date().getFullYear()} Autoevaluación
        </footer>
    );
}