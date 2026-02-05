import { useState, useEffect, useRef } from 'react';
import './quehacemos.css';

const QueHacemos = () => {
  const [openGallery, setOpenGallery] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);

  const galleries = {
    corte: [
      '/images/cut1.jpg',
      '/images/cut2.jpg',
      '/images/cut3.jpg',
      '/images/cut4.jpg'
    ],
    color: [
      '/images/color1.jpg',
      '/images/color2.jpg',
      '/images/color3.jpg',
      '/images/color4.jpg'
    ],
    peinado: [
      '/images/peinado1.jpg',
      '/images/peinado2.jpg',
      '/images/peinado3.jpg',
      '/images/peinado4.jpg'
    ]
  };

  // swipe / pointer state
  const ptr = useRef({ active: false, startX: 0, lastX: 0 });

  const onPointerDown = (e) => {
    ptr.current.active = true;
    const cx = (typeof e.clientX === 'number') ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
    ptr.current.startX = cx;
    ptr.current.lastX = cx;
  };

  const onPointerMove = (e) => {
    if (!ptr.current.active) return;
    ptr.current.lastX = (typeof e.clientX === 'number') ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX) || ptr.current.lastX;
  };

  const onPointerUp = (e) => {
    if (!ptr.current.active) return;
    const endX = (typeof e.clientX === 'number') ? e.clientX : (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX) || ptr.current.lastX;
    const delta = endX - ptr.current.startX;
    const THRESH = 50; // px
    if (Math.abs(delta) > THRESH) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    ptr.current.active = false;
  };

  const onPointerCancel = () => { ptr.current.active = false };

  // keyboard navigation for gallery / modal
  useEffect(() => {
    const onKey = (e) => {
      if (!openGallery && !zoomImage) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') {
        if (zoomImage) setZoomImage(null);
        else handleGalleryClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openGallery, zoomImage, handlePrev, handleNext, handleGalleryClose]);

  const handleGalleryOpen = (type) => {
    setOpenGallery(type);
    setCarouselIndex(0);
  };

  const handleGalleryClose = () => {
    setOpenGallery(null);
    setZoomImage(null);
  };

  const handlePrev = () => {
    const current = galleries[openGallery];
    setCarouselIndex((prev) => (prev === 0 ? current.length - 1 : prev - 1));
  };

  const handleNext = () => {
    const current = galleries[openGallery];
    setCarouselIndex((prev) => (prev === current.length - 1 ? 0 : prev + 1));
  };

  const renderGallery = (type) => {
    if (openGallery !== type) return null;

    const images = galleries[type];
    const currentImage = images[carouselIndex];

    return (
      <div className="gallery-container">
        <div className="carousel-wrapper">
          <button className="carousel-btn prev" onClick={handlePrev} aria-label="Imagen anterior">‹</button>
          
          <div
            className="carousel-track"
            onPointerDown={(e) => onPointerDown(e)}
            onPointerMove={(e) => onPointerMove(e)}
            onPointerUp={(e) => onPointerUp(e)}
            onPointerCancel={(e) => onPointerCancel(e)}
          >
            <img
              src={currentImage}
              alt={`${type} ${carouselIndex + 1}`}
              className="carousel-item active"
              loading="lazy"
              onClick={() => setZoomImage(currentImage)}
            />
          </div>

          <button className="carousel-btn next" onClick={handleNext} aria-label="Siguiente imagen">›</button>
        </div>

        <div className="carousel-indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === carouselIndex ? 'active' : ''}`}
              onClick={() => setCarouselIndex(idx)}
              aria-label={`Ir a imagen ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="que-hacemos" className="section-container services-bg">
        <div className="content-wrapper">
          <h2>¿Qué hacemos?</h2>
          <div className="cards-grid">
            <article className="card">
              <div className="card-media">
                <img src="/images/cut.jpg" alt="Corte Urbano" loading="lazy" />
              </div>
              <div className="card-body">
                <h3>Corte Urbano</h3>
                <p>Estilos modernos y fades precisos.</p>
                <button className="gallery-link" onClick={() => handleGalleryOpen('corte')}>
                  Ver galería
                </button>
              </div>
              {renderGallery('corte')}
            </article>

            <article className="card">
              <div className="card-media">
                <img src="/images/color.png" alt="Coloración" loading="lazy" />
              </div>
              <div className="card-body">
                <h3>Coloración</h3>
                <p>Desde platinados hasta colores fantasía.</p>
                <button className="gallery-link" onClick={() => handleGalleryOpen('color')}>
                  Ver galería
                </button>
              </div>
              {renderGallery('color')}
            </article>

            <article className="card">
              <div className="card-media">
                <img src="/images/peinado.jpg" alt="Styling" loading="lazy" />
              </div>
              <div className="card-body">
                <h3>Peinados</h3>
                <p>Peinados para eventos y producciones.</p>
                <button className="gallery-link" onClick={() => handleGalleryOpen('peinado')}>
                  Ver galería
                </button>
              </div>
              {renderGallery('peinado')}
            </article>
          </div>
        </div>
      </section>

      {zoomImage && (
        <div
          className="modal-overlay"
          onClick={handleGalleryClose}
          onPointerDown={(e) => onPointerDown(e)}
          onPointerMove={(e) => onPointerMove(e)}
          onPointerUp={(e) => onPointerUp(e)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleGalleryClose}>✕</button>
            <img src={zoomImage} alt="Amplificado" className="modal-image" loading="lazy" />
          </div>
        </div>
      )}
    </>
  );
};

export default QueHacemos;