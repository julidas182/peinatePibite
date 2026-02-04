import React from 'react';
import './dondeestamos.css';

const Location = () => {
  return (
    <section id="donde-estamos" className="section-container location-bg">
      <div className="location-wrapper">
        <div className="text-side">
          <h2>¿Dónde estamos?</h2>
          <p className="lead">Principalmente trabajamos en Córdoba Capital, atendiendo cortes, coloración y styling. También realizamos servicios a domicilio y nos trasladamos a otras ciudades o localidades según la demanda y la naturaleza del evento.</p>

          <ul className="services-list">
            <li>Atención en salón en Córdoba Capital</li>
            <li>Servicios a domicilio dentro de la provincia</li>
            <li>Desplazamientos para eventos privados y producciones</li>
          </ul>

          <div className="action-row">
            <a className="btn primary" href="https://www.google.com/maps/search/C%C3%B3rdoba+Capital+Argentina" target="_blank" rel="noreferrer">Ver en Google Maps</a>
            <a className="btn ghost" href="mailto:contacto@peinate.com">Solicitar desplazamiento</a>
          </div>
        </div>

        <div className="map-side" aria-hidden="true">
          <div className="map-placeholder">Cordoba Capital</div>
        </div>
      </div>
    </section>
  )
}

export default Location;