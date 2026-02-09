import React from 'react'
import Navbar from '../Navbar/Navbar'
import SEOHelmet from '../SEOHelmet/SEOHelmet'
import SchemaMarkup from '../SchemaMarkup/SchemaMarkup'
import Welcome from '../Welcome/Welcome'
import Footer from '../Footer/Footer'
import QueHacemos from '../QueHacemos/QueHacemos'
import DondeEstamos from '../DondeEstamos/DondeEstamos'
import Contactanos from '../Contactanos/Contactanos'

const Home = () => {
  return (
    <div className='home'>
        <SEOHelmet 
          title="Peinate Pibite - Salon de Belleza Profesional | Cortes, Colorimetría y Peinados"
          description="Salon de belleza especializado en cortes, colorimetría y peinados. Servicios profesionales con diseño responsive. ¡Contactanos hoy!"
          image="/images/peinado1.jpg"
          url="https://tu-dominio.com"
        />
        <SchemaMarkup />
        <Navbar nombre="PEINATE PIBITE" li1="Que hacemos?" li2="Donde estamos?" li3="Contactanos"/>
        <Welcome/>
        <QueHacemos/>
        <DondeEstamos/>
        <Contactanos/>
        <Footer/>
    </div>
  )
}

export default Home