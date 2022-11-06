import React, { useRef, useState, useEffect } from "react";

import { Analytics } from '@vercel/analytics/react';

import Head from 'next/head'
import NavBar from '../components/NavBar'
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

  const [saveLogState, setSaveLogState] = useState('0')
  const saveLog = (props) => {
    setSaveLogState(props)
  }


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
