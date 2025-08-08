import { useState, useEffect } from 'react';

function ImageView({ folderName, images, onBack }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 600;

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const showNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const navButtonStyle = {
    position: 'absolute',
    fontSize: '2rem',
    color: 'white',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1001,
    transition: 'transform 0.2s ease, opacity 0.2s ease',
  };

  return (
    <div className="image-view">
      <button className="back-button" onClick={onBack}>← Volver</button>
      <h2 className="section-title">{folderName}</h2>
      <div className="image-grid">
        {images.map((img, idx) => (
          <div key={idx} className="image-card">
            <div className="image-info">
              <p className="price-tag">{img.price}</p>
              <img
                src={`/${img.name}`}
                alt={img.name}
                onClick={() => handleClick(idx)}
                style={{ cursor: 'pointer' }}
              />
              <p className="stock-text">Existencias: {img.stock}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >

          {/* Botón de cerrar */}
          <button
            onClick={closeModal}
            style={{
              ...navButtonStyle,
              top: 'calc(50% - 100vh)',
              top: '50px',
              left: '50%',
              right: 'auto',
              transform: 'translateX(-50%)',
              fontSize: '2.5rem',
            }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { transform: 'translateX(-50%) scale(1.2)', opacity: 0.7 })}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: 'translateX(-50%)', opacity: 1 })}
          >
            ✕
          </button>

          {/* Botón anterior */}
          <button
            onClick={showPrev}
            style={{
              ...navButtonStyle,
              left: isMobile ? '10px' : '500px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '3rem',
            }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { opacity: 0.7 })}
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { opacity: 1 })
            }
          >
            ‹
          </button>

          {/* Imagen con animación y perspectiva */}
          <div style={{ perspective: '1000px' }}>
            <img
              src={`/${images[selectedIndex].name}`}

              alt={images[selectedIndex].name}
              className="modal-image-animated"
              style={{
                maxHeight: '90vh',
                maxWidth: '90vw',
                boxShadow: '0 0 15px black',
              }}
            />
          </div>

          {/* Botón siguiente */}
          <button
            onClick={showNext}
            style={{
              ...navButtonStyle,
              right: isMobile ? '10px' : '500px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '3rem',
            }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { opacity: 0.7 })}
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { opacity: 1 })
            }
          >
            ›
          </button>

        </div>
      )}
    </div>
  );
}

export default ImageView;