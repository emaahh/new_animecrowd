import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';

import Head from 'next/head'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../styles/globals.css'


import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useAutoAnimate } from '@formkit/auto-animate/react'

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [animationParent] = useAutoAnimate()

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: 'Work Sans, sans-serif',
    },
  });

  const [saveLogState, setSaveLogState] = useState(0)
  const [profileSetting, setProfileSetting] = useState(false)
  const saveLog = (props) => {
    setSaveLogState(props)
  }
  const openProfileSetting = (props) => {
    setProfileSetting(props)
  }

  //nav background dynamic
  useEffect(() => {
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {

        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.5)";
            document.getElementById("navbar").style.backdropFilter = "blur(50px)"
            document.getElementById("navbar").className= "blurnav"
            
        } else {
            document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
            document.getElementById("navbar").style.backdropFilter = "none"
            document.getElementById("navbar").className= ""
        }
    }
}, [])


  return (
    <UserContext.Provider value={{isLogStored: saveLogState, saveLog, impProfilo: profileSetting, openProfileSetting}}>
      <ThemeProvider theme={darkTheme} ref={animationParent}>
        <Head>
        
          
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2371206706057153" crossorigin="anonymous"></script>

          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@500;900&display=swap" rel="stylesheet"></link>
          <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        </Head>


        <div ref={animationParent} >
          <NavBar />

          <Component {...pageProps}/> 

          {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="animecrowd" data-description="Support me on Buy me a coffee!" data-message="Grazie di utilizzare AnimeCrowd ❤️, se credi nel progetto puoi aiutarci con il suo mantenimento mensile, basta veramente poco." data-color="#BD5FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}

          <Footer />
        </div>
        
        <Analytics />

      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
