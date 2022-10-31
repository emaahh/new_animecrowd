import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from "react";

import { useAutoAnimate } from '@formkit/auto-animate/react';

import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

import Grid from '@mui/material/Grid';

import loadingGIF from '/public/loadingGIF.gif';

import CardComponent from '../components/CardComponent';
import VideoHome from '../components/VideoHome';


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
    <div ref={animationParent} style={{height: '1px'}}>
      <Head>
        <title>AnimeCrowd</title>
        <meta name="description" content="Anime in streaming e download SUB ITA e ITA" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,200" />
      </Head>

      {isLoading == true ?

        <div style={{width: '-webkit-fill-available', flexDirection: 'column-reverse', position: 'absolute', top: '-70px', left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', height: '100vh', zIndex: '9999', display: 'flex', flexWrap: 'nowrap'}}>
          
          <Image className="heartbeat" src={loadingGIF} style={{width: '100px', height: 'auto'}}/> 
          <br></br>
        </div>
        
        : null}

        <Carousel interval={10000} fullHeightHover={false} cycleNavigation={true} navButtonsAlwaysVisible={true} indicators={false} animation={'slide'} duration={500} sx={{top: '-70px', position: 'relative', zIndex: '-9999'}}>
          <Paper>
            <VideoHome Titolo="Chainsaw Man" OP="https://joy.videvo.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4"/>
          </Paper>
          <Paper>
            <VideoHome Titolo="Tokyo Revengers" OP="https://joy.videvo.net/videvo_files/video/free/2013-08/large_watermarked/hd0983_preview.mp4"/>
          </Paper>
        </Carousel>
      

      <div style={{marginTop: '-70px'}}>
        
          <strong><h1 style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>NUOVE AGGIUNTE</h1></strong>
          <br></br>

          <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

            {allAnime.slice(-4).reverse().map((_, index) => (
              <Grid item key={index} style={{maxWidth: '400px'}}>
                <CardComponent Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
              </Grid>
            ))}
            
          </Grid> 

          <br></br>
          
          <strong><h1 style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>NUOVE AGGIUNTE</h1></strong>
          <br></br>

          <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

            {allAnime.slice(-4).reverse().map((_, index) => (
              <Grid item key={index} style={{maxWidth: '400px'}}>
                <CardComponent Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
              </Grid>
            ))}
            
          </Grid> 

          <br></br>

      </div>

    </div>
  )
}