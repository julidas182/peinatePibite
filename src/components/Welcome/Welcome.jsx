import './welcome.css';

const Welcome = () => {
  return (
    <section id="welcome" className="welcome-section">
      <div className="welcome-container">
        <div className="welcome-image">
          <img src="/images/imagenBienvenida.jpg" alt="Bienvenido a Peinate Pibite" loading="lazy" />
        </div>
        <div className="welcome-content">
          <h1>Peinate Pibite</h1>
          <p className="tagline">Tu estilo, nuestra pasión</p>
          <p className="description">
            Somos una barbería moderna especializada en cortes urbanos, coloración y styling. 
            Nos dedicamos a crear looks únicos que reflejen tu personalidad y te hagan sentir 
            seguro. Cada servicio es personalizado, con atención al detalle y técnicas actualizadas.
          </p>
          <p className="description">
            Trabajamos en Córdoba Capital y nos trasladamos a otros lugares según eventos y necesidades. 
            Buscamos innovar constantemente para ofrecerte lo mejor en cada visita.
          </p>
          <a href="#que-hacemos" className="cta-button">
            Descubre nuestros servicios
          </a>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
