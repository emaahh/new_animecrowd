import Head from 'next/head';
import Script from 'next/script'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useRef, useState, useMemo } from "react";

import { useAutoAnimate } from '@formkit/auto-animate/react';

import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Fab from '@mui/material/Fab';

import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Grid from '@mui/material/Grid';

import Loading from '/components/Loading'

import CardComponent from '../components/CardComponent';
import VideoHome from '../components/VideoHome';

import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import {UserContext} from './_app'


export default function Home() {
  const unique_id = new Date().getTime();
  const valueee = React.useContext(UserContext);  
  
  const [animationParent] = useAutoAnimate()

  const [voted, setVoted] = useState([])
  const [newEpisode, setNewEpisode] = useState([])
  const [allAnime, setAllAnime] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [hidd, setHidd] = useState(true)

  const [isLog, setIsLog] = useState(false);
  const [accountData, setAccountData] = useState(undefined);

  const [animeDaContinuare, setAnimeDaContinuare] = useState([])

  function LogIn(emailPROPS, passwordPROPS) {
    
        fetch('/api/logIn/'+emailPROPS+'/'+passwordPROPS)
        .then(data => data.json()).then(data => {
            setAccountData(data)
            setIsLog(true)
        })
  }
  useEffect(() => {
        if(valueee.isLogStored == 1 && accountData==undefined){

            LogIn(getCookie('email'),getCookie('password'))

        }else if(valueee.isLogStored == 0){
            if(accountData===undefined){
                setIsLog(false)
            }else{
                setAccountData(undefined)
                setIsLog(false)
            }
            
        }
  })

  useEffect(() => {
    setLoading(true)

    fetch('/api/findpopular')
      .then((res) => res.json())
      .then((data) => {
        setVoted(data)
      })

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

      let rr = [];
      if(isLog == true && accountData!=undefined && accountData[0].Lista){
        accountData[0].Lista.map((_, index) => {

          if(_.state == 1){
            fetch('/api/findAnime/' + _._id)
            .then((res) => res.json())
            .then((data1) => {
              let e = data1[0];
              rr.push(e)
            })
          }
          if(index+1 == accountData[0].Lista.length){
            setAnimeDaContinuare([])
            setAnimeDaContinuare(rr)
          }

        });
      }

  }, [isLog])

  
  return (
    <div ref={animationParent} style={{height: '1px'}}>
      <Head>
        <title>AnimeCrowd</title>
        
        <meta name="description" content="Guarda anime in streaming e download SUB ITA e ITA completamente gratis e senza pop-up fastidiosi su AnimeCrowd" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://animecrowd.it/" />
        <meta name="keywords" content="Anime, Naruto, Onepiece, Episodi, Puntate, Toriko, Kuroko, Inazuma, Oav, Film, Faunsub, Traduttori, Fairy, Tail, bleach, hunter, sword, art, online, pokémon, infinite, stratos, log, horizon, blazblue, tokyo, ravens, soul, eater, outbreak, company, ecchi, dragon, ball, super, fullmetal, quanzhi, fashi, anime streaming, anime sub ita, anime ita, AnimeCrowd, Anime Streaming, Anime Streaming ITA, Streaming Anime SUB ITA, Streaming Anime ITA, Lista Anime ITA, Lista Anime SUB ITA, "/>
        <meta property="og:image" content="https://www.animecrowd.it/favicon.ico"></meta>
        <meta name="author" content="AnimeCrowd"></meta>
        <meta name="msapplication-TileColor" content="#000000"></meta>
        <meta name="theme-color" content="#000000"></meta>

        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,200" />
      
        <link rel="preload" href="/eventoNatale/slitta.png" as="image"></link>

        <meta name="Trafficstars" content="38584"></meta>
      </Head>

      {isLoading == true ?
        <Loading/>
      : 
  
        <>
          <Carousel interval={10000} fullHeightHover={false} cycleNavigation={true} navButtonsAlwaysVisible={false} indicators={false} animation={'slide'} duration={500} sx={{top: '-70px', position: 'relative', zIndex: '-9999'}}>
            <Paper style={{backgroundColor: 'black', backgroundImage: 'none',}}>
              <VideoHome Titolo="VINLAND SAGA 2" OP="https://i.imgur.com/xzmdmm9.mp4" id="63b16a2846272d1ff302d8f5" inarrivo="no"/>
            </Paper>
          </Carousel>
          
        

          <div style={{marginTop: '-90px'}} ref={animationParent}>
            

            <center>
              <a href={'https://t.me/AnimeCrowd'} target="_blank" rel="noreferrer">
                <Fab sx={{height: '30px', backgroundColor: 'rgb(51, 168, 217)'}} variant="extended" style={{margin: '5px'}}>
                  <strong>GRUPPO TELEGRAM</strong>
                </Fab>
              </a>

              <a href={'https://t.me/animecrowdnews'} target="_blank" rel="noreferrer">
                <Fab sx={{height: '30px', backgroundColor: 'rgb(51, 168, 217)'}} variant="extended" style={{margin: '5px'}}>
                  <strong>CANALE NEWS</strong>
                </Fab>
              </a>
              
              <a href={'https://www.tiktok.com/@dumbotakudevvvv'} target="_blank" rel="noreferrer">
                <Fab sx={{height: '30px', backgroundColor: 'rgb(238, 29, 82)'}} variant="extended" style={{margin: '5px'}}>
                  <strong>TikTok</strong>
                </Fab>
              </a>

              {/*<a href={'https://www.buymeacoffee.com/animecrowd'} target="_blank" rel="noreferrer">
                <Fab sx={{height: '30px', backgroundColor: '#fd0'}} variant="extended" style={{margin: '5px'}}>
                  <strong>Supporta AnimeCrowd</strong>
                </Fab>
              </a>*/}
            </center>

            
            {/*CONTINUA*/}
            {
              isLog?
                animeDaContinuare.length!=0 ? 
                  <>
                    <strong><h1 id="dacontinuareephead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>CONTINUA...</h1></strong>
                    <br></br>

                    <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

                      {animeDaContinuare.map((_, index) => (
                        <Grid item key={index} style={{maxWidth: '400px'}}>
                          <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                        </Grid>
                      ))}
                        
                    </Grid> 

                    <br></br>
                  </>
                : 
                  null
              : 
                null
            }
            
            {/*NUOVI EPISODI*/}
            <strong><h1 id="nuoviephead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>NUOVI EPISODI</h1></strong>
            <br></br>

            <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

              {newEpisode.map((_, index) => (
                <Grid item key={index} style={{maxWidth: '400px'}}>
                  <CardComponent EPISODE={true} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                </Grid>
              ))}

              {newEpisode.length==0?
                <p>Nessun nuovo episodio trovato</p>
              :null}
                
            </Grid> 

            <br></br>



            {/*VOTATI*/}
            <strong><h1 id="nuoviephead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>I PIÙ VOTATI</h1></strong>
            <p style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif', marginTop: '-20px', marginBottom: '16px'}}>su myanimelist</p>
            <br></br>

            <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

              {voted.sort((a, b) => b.Valutazione - a.Valutazione).map((_, index) => (
                <Grid item key={index} style={{maxWidth: '400px'}}>
                  <CardComponent Votato="si" Voto={_.Valutazione} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Generi={_.Generi}/>
                </Grid>
              ))}

              {newEpisode.length==0?
                <p>Nessuna classifica trovata</p>
              :null}
                
            </Grid> 

            <br></br>




            {/*IN CORSO*/}
            <strong><h1 id="incorsohead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>IN CORSO</h1></strong>
            <br></br>

            <Grid container className={hidd==true? 'hidd':''} columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

                {allAnime.reverse().map((_, index) => (
                  _.Stato == 'In corso'?
                    <Grid item key={index} style={{maxWidth: '400px'}}>
                      <CardComponent Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                    </Grid>
                  : null
                ))}
                
            </Grid> 
            <center><h4 style={{cursor:'pointer'}} onClick={()=>setHidd(!hidd)}>mostra {hidd==false? 'meno':'tutto'}</h4></center>
            
            <br></br>
              


            {/*IN CORSO*/}
            <strong><h1 id="nuoveaggiuntehead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>NUOVE AGGIUNTE</h1></strong>
            <br></br>

            <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>

              {allAnime.reverse().slice(-4).reverse().map((_, index) => (
                <Grid item key={index} style={{maxWidth: '400px'}}>
                  <CardComponent Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                </Grid>
              ))}
                
            </Grid> 

            <br></br>

          </div>

        </>

      }

      <br></br>
      <br></br>
      <br></br>


      <div id="ts_ad_native_rackl"></div>
      <Script
        src={`//cdn.runative-syndicate.com/sdk/v1/n.js?cacheControl=${new Date().getTime()}`}
        onLoad={() => {
          NativeAd({
            element_id: "ts_ad_native_rackl",
            spot: "c939fab80dfa473187afa2b40b0c48cc",
            type: "label-under",
            cols: 4,
            rows: 1,
            mobileEnabled: false,
            title: "Suggested for you",
            titlePosition: "left",
            adsByPosition: "right",
          });
        }}
      />

    
    </div>
  )
};


