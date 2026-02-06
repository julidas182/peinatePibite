import React from 'react'
import Navbar from '../Navbar/Navbar'
import Welcome from '../Welcome/Welcome'
import Footer from '../Footer/Footer'
import QueHacemos from '../QueHacemos/QueHacemos'
import DondeEstamos from '../DondeEstamos/DondeEstamos'
import Contactanos from '../Contactanos/Contactanos'

const Home = () => {
  return (
    <div className='home'>
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