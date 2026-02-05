import { useState, useEffect, useRef } from 'react';
import './quehacemos.css';

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

const QueHacemos = () => {
  const [openGallery, setOpenGallery] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  // swipe / pointer state
  const ptr = useRef({ active: false, startX: 0, lastX: 0 });
  const openGalleryRef = useRef(openGallery);
  const zoomImageRef = useRef(zoomImage);

  useEffect(() => { openGalleryRef.current = openGallery }, [openGallery]);
  useEffect(() => { zoomImageRef.current = zoomImage }, [zoomImage]);

  const onPointerDown = (e) => {
    ptr.current.active = true;
    ptr.current.startX = e.clientX;
    ptr.current.lastX = e.clientX;
  };

  const onPointerMove = (e) => {
    if (!ptr.current.active) return;
    ptr.current.lastX = e.clientX;
  };

  const onPointerUp = (e) => {
    if (!ptr.current.active) return;
    const endX = e.clientX || ptr.current.lastX;
    const delta = endX - ptr.current.startX;
    const THRESH = 50; // px
    if (Math.abs(delta) > THRESH) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    ptr.current.active = false;
  };

  const onPointerCancel = () => { ptr.current.active = false };

  // keyboard navigation for gallery / modal (uses refs to avoid hook deps)
  useEffect(() => {
    const onKey = (e) => {
      if (!openGalleryRef.current && !zoomImageRef.current) return;
      if (e.key === 'ArrowLeft') {
        const current = galleries[openGalleryRef.current];
        setCarouselIndex(prev => (prev === 0 ? current.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        const current = galleries[openGalleryRef.current];
        setCarouselIndex(prev => (prev === current.length - 1 ? 0 : prev + 1));
      }
      if (e.key === 'Escape') {
        if (zoomImageRef.current) setZoomImage(null);
        else {
          setOpenGallery(null);
          setZoomImage(null);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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