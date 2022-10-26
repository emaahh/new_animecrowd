import React, { useRef, useState, useEffect } from "react";

import Head from 'next/head'
import NavBar from '../components/NavBar'
import '../styles/globals.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useAutoAnimate } from '@formkit/auto-animate/react'


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


  return (
    
    <ThemeProvider theme={darkTheme} ref={animationParent}>

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@500;900&display=swap" rel="stylesheet"></link>
      </Head>

      <div ref={animationParent} style={{backdropFilter: 'blur(100px)', background: "rgba(0,0,0,0.7)",}}>
        <NavBar />
        <Component {...pageProps}/> 
      </div>

      </ThemeProvider>
  )
}

export default MyApp
