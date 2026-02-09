import React, { useEffect } from 'react'

const SEOHelmet = ({ 
  title = "Peinate Pibite - Salon de Belleza Profesional",
  description = "Servicios profesionales de peluquería: cortes, colorimetría y peinados.",
  image = "/images/peinado1.jpg",
  url = "https://tu-dominio.com"
}) => {
  useEffect(() => {
    // Actualizar title
    document.title = title
    
    // Actualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = description
    
    // Actualizar Open Graph tags
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', image)
    updateMetaTag('og:url', url)
    
    // Actualizar Twitter Card tags
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
  }, [title, description, image, url])

  const updateMetaTag = (property, content) => {
    const isProperty = property.startsWith('og:') || property.startsWith('twitter:')
    const attrName = isProperty ? 'property' : 'name'
    
    let tag = document.querySelector(`meta[${attrName}="${property}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(attrName, property)
      document.head.appendChild(tag)
    }
    tag.content = content
  }

  return null
}

export default SEOHelmet
