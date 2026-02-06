import React, { useState, useEffect } from 'react'
import './navbar.css'

const Navbar = ({ nombre, li1, li2, li3 }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Prevent background scroll when overlay menu open
    if (open) document.body.classList.add('nav-open')
    else document.body.classList.remove('nav-open')

    return () => document.body.classList.remove('nav-open')
  }, [open])

  // close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className='navbar-contenedor'>
      <h1 className='titulo-web'>{nombre}</h1>

      <button
        className={`nav-toggle ${open ? 'open' : ''}`}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`lista-navegacion ${open ? 'open' : ''}`}>
        <li><a href="#que-hacemos" onClick={() => setOpen(false)}>{li1}</a></li>
        <li><a href="#donde-estamos" onClick={() => setOpen(false)}>{li2}</a></li>
        <li><a href="#contactanos" onClick={() => setOpen(false)}>{li3}</a></li>
      </ul>
    </div>
  )
}

export default Navbar