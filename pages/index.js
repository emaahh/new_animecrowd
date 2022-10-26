import Head from 'next/head'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from "react";

import { useAutoAnimate } from '@formkit/auto-animate/react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import loadingGIF from '/public/loadingGIF.gif'

import VideoHome from '../components/VideoHome';
import CardComponent from '../components/CardComponent'


export default function Home() {
  
  const [animationParent] = useAutoAnimate()

  const [allAnime, setAllAnime] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/api/allanimeapi')
      .then((res) => res.json())
      .then((data) => {
        setAllAnime(data)
        setLoading(false)
      })
  }, [])

  return (
    <div ref={animationParent}>
      <Head>
        <title>AnimeCrowd</title>
        <meta name="description" content="Anime in streaming e download SUB ITA e ITA" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,200" />
      </Head>

      {isLoading == true ?

        <div style={{flexDirection: 'column-reverse', position: 'absolute', top: '0', left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', width: '100%', height: '100vh', zIndex: '9999', display: 'flex', flexWrap: 'nowrap'}}>
          
          <Image src={loadingGIF} style={{width: '100px', height: 'auto'}}/> 
          <br></br>
        </div>
        
        : null}

      <VideoHome/>

      <br></br>

      <center>
        <div style={{width: 'max-content', position: 'relative', justifyContent: 'center', display: 'flex', backgroundColor: 'rgb(220 135 255)', paddingLeft: '25px', paddingRight: '25px', borderRadius: '100px'}}>
          <h3 style={{margin: '10px', fontFamily: 'Work Sans, sans-serif', fontWeight: '500'}}>NUOVE AGGIUNTE</h3>
        </div>
      </center>
      <br></br>

        <Grid continer columns={{ xs: 100, sm: 100, md: 100 }} style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

          {allAnime.slice(-4).reverse().map((_, index) => (
            <Grid item key={index} style={{maxWidth: '400px', width: '100%'}}>
              <CardComponent Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id}/>
            </Grid>
          ))}
          
        </Grid> 

        <br></br>
        
        <center>
          <div style={{width: 'max-content', position: 'relative', justifyContent: 'center', display: 'flex', backgroundColor: '', paddingLeft: '25px', paddingRight: '25px', borderRadius: '100px'}}>
            <h3 style={{margin: '10px', fontFamily: 'Work Sans, sans-serif', fontWeight: '500'}}>NUOVE AGGIUNTE</h3>
          </div>
        </center>
        <br></br>

        <Grid continer columns={{ xs: 100, sm: 100, md: 100 }} style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

          {allAnime.slice(-4).reverse().map((_, index) => (
            <Grid item key={index} style={{maxWidth: '400px', width: '100%'}}>
              <CardComponent Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id}/>
            </Grid>
          ))}
          
        </Grid>  

    </div>
  )
}
