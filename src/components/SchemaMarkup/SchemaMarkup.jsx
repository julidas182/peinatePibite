import React, { useEffect } from 'react'

const SchemaMarkup = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Peinate Pibite",
      "image": "https://tu-dominio.com/images/peinado1.jpg",
      "description": "Salon de belleza especializado en cortes, colorimetría y peinados",
      "url": "https://tu-dominio.com",
      "telephone": "+34-XXX-XXXXXX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Principal 123",
        "addressLocality": "Tu Ciudad",
        "addressRegion": "Tu Provincia",
        "postalCode": "12345",
        "addressCountry": "ES"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ],
      "priceRange": "€€",
      "sameAs": [
        "https://www.facebook.com/tuPagina",
        "https://www.instagram.com/tuPagina",
        "https://www.youtube.com/tuPagina"
      ],
      "service": [
        {
          "@type": "Service",
          "name": "Cortes de Cabello",
          "description": "Cortes profesionales personalizados",
          "image": "/images/cut1.jpg"
        },
        {
          "@type": "Service",
          "name": "Colorimetría",
          "description": "Tintado y colorimetría profesional",
          "image": "/images/color1.jpg"
        },
        {
          "@type": "Service",
          "name": "Peinados",
          "description": "Peinados para eventos y ocasiones especiales",
          "image": "/images/peinado1.jpg"
        }
      ]
    }

    // Crear o actualizar script de Schema.org
    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
  }, [])

  return null
}

export default SchemaMarkup
