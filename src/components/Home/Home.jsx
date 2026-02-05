import React from 'react'
import Navbar from '../Navbar/Navbar'
import Welcome from '../Welcome/Welcome'
import Footer from '../Footer/Footer'
import QueHacemos from '../QueHacemos/QueHacemos'
import DondeEstamos from '../DondeEstamos/DondeEstamos'

const Home = () => {
  return (
    <div className='home'>
        <Navbar nombre="PEINATE PIBITE" li1="Que hacemos?" li2="Donde estamos?" li3="Nuestros trabajos"/>
        <Welcome/>
        <QueHacemos/>
        <DondeEstamos/>
        <Footer/>
    </div>
  )
}

export default Home