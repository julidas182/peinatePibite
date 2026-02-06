import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './contactanos.css'

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    consulta: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef()

  // Inicializar EmailJS (usar tus credenciales públicas)
  useEffect(() => {
    emailjs.init('YOUR_PUBLIC_KEY') // Reemplaza con tu public key de EmailJS
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validación básica
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.consulta.trim()) {
      setError('Por favor completa todos los campos')
      setLoading(false)
      return
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido')
      setLoading(false)
      return
    }

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      )
      setSubmitted(true)
      setFormData({ nombre: '', email: '', consulta: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('Error al enviar:', err)
      setError('Error al enviar el formulario. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contactanos" className="contactanos-section">
      <div className="contactanos-container">
        <h2>Contactanos</h2>
        <p className="contactanos-subtitle">Envíanos tu consulta y nos pondremos en contacto</p>

        {submitted && (
          <div className="success-message">
            ✓ Consulta enviada con éxito. Te responderemos pronto.
          </div>
        )}

        {error && (
          <div className="error-message">
            ✗ {error}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="contactanos-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="consulta">Consulta *</label>
            <textarea
              id="consulta"
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
              placeholder="Cuéntanos tu consulta..."
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Consulta'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contactanos
