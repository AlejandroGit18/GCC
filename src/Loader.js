// Loader.js
import React from 'react';
import './Loader.css';

function Loader() {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
}

export default Loader;
