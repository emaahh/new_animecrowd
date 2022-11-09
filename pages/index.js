import Head from 'next/head';
import React, { useEffect, useRef, useState, useMemo } from "react";

import { useAutoAnimate } from '@formkit/auto-animate/react';

import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

import Grid from '@mui/material/Grid';

import Loading from '/components/Loading'

import CardComponent from '../components/CardComponent';
import VideoHome from '../components/VideoHome';


export default function Home() {

  const nuoviephead = useRef(null);
  const incorsohead = useRef(null);
  const nuoveaggiuntehead = useRef(null);

  
  const [animationParent] = useAutoAnimate()

  const [newEpisode, setNewEpisode] = useState([])
  const [allAnime, setAllAnime] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    fetch('/api/findnew')
      .then((res) => res.json())
      .then((data) => {
        setNewEpisode(data)
      })

    fetch('/api/allanimeapi')
      .then((res) => res.json())
      .then((data) => {
        setAllAnime(data)
        setTimeout(() => {
          setLoading(false)
        }, 1000);
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
            <Loading/>
          : null}

        <Carousel interval={10000} fullHeightHover={false} cycleNavigation={true} navButtonsAlwaysVisible={false} indicators={false} animation={'slide'} duration={500} sx={{top: '-70px', position: 'relative', zIndex: '-9999'}}>
          <Paper>
            <VideoHome Titolo="Chainsaw Man" OP="/CHAINSAWMAN.mp4"/>
          </Paper>
        </Carousel>
      

      <div style={{marginTop: '-90px'}} ref={animationParent}>

        <strong><h1 ref={nuoviephead} id="nuoviephead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>NUOVI EPISODI</h1></strong>
        <br></br>

        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

          {newEpisode.map((_, index) => (
            <Grid item key={index} style={{maxWidth: '400px'}}>
              <CardComponent EPISODE={true} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
            </Grid>
          ))}
            
        </Grid> 

        <br></br>


        
          <strong><h1 ref={incorsohead} id="incorsohead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>IN CORSO</h1></strong>
          <br></br>

          <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

            {allAnime.reverse().map((_, index) => (
              _.Stato == 'In corso'?
                <Grid item key={index} style={{maxWidth: '400px'}}>
                  <CardComponent Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                </Grid>
              : null
            ))}
            
          </Grid> 

          <br></br>
          
          <strong><h1 ref={nuoveaggiuntehead} id="nuoveaggiuntehead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>NUOVE AGGIUNTE</h1></strong>
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
};


