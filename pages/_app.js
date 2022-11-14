import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';

import Head from 'next/head'
import NavBar from '../components/NavBar'
import '../styles/globals.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useAutoAnimate } from '@formkit/auto-animate/react'

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
  const saveLog = (props) => {
    setSaveLogState(props)
  }

  //nav background dynamic
  useEffect(() => {
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {

        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.backgroundColor = "black";
        } else {
            document.getElementById("navbar").style.backgroundColor = "transparent";
        }
        if(document.getElementById("nuoviephead") != null){
          if (document.body.scrollTop > 470 && document.body.scrollTop < 740 || document.documentElement.scrollTop > 470 && document.documentElement.scrollTop < 780) {
              document.getElementById("nuoviephead").style = " transform: translate(-2.5%, 0%); text-align: center; font-size: 20px; z-index: 2; position: fixed; top: 45px; padding-left: 4.5vw; padding-top: 25px; padding-bottom: 15px; background-color: rgba(0,0,0,0.5); width: -webkit-fill-available; backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);";
          }else{
            document.getElementById("nuoviephead").style = " transform: translate(0%, 0%); text-align: left; font-size: 2em; position: relative; top: auto; padding-left: 4.5vw; height: auto; backdrop-filter: none;";
          }

          if (document.body.scrollTop > 780 && document.body.scrollTop < 2050 || document.documentElement.scrollTop > 780 && document.documentElement.scrollTop < 2050) {
            document.getElementById("incorsohead").style = " transform: translate(-2.5%, 0%); text-align: center; font-size: 20px; z-index: 2; position: fixed; top: 45px; padding-left: 4.5vw; padding-top: 25px; padding-bottom: 15px; background-color: rgba(0,0,0,0.5); width: -webkit-fill-available; backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);";
          }else{
            document.getElementById("incorsohead").style = " transform: translate(0%, 0%); text-align: left; font-size: 2em; position: relative; top: auto; padding-left: 4.5vw; height: auto; backdrop-filter: none;";
          }
        }
    }
}, [])


  return (
    <UserContext.Provider value={{isLogStored: saveLogState, saveLog}}>
      <ThemeProvider theme={darkTheme} ref={animationParent}>

        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@500;900&display=swap" rel="stylesheet"></link>
          <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"/>
        </Head>

        <div ref={animationParent} >
          <NavBar />

          <Component {...pageProps}/> 
        </div>
        
        <Analytics />

      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
