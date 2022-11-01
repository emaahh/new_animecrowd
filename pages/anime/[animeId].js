import React, { useRef, useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import loadingGIF from '/public/loadingGIF.gif'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Grid from '@mui/material/Grid';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';



function AnimePage() {
    const [animationParent] = useAutoAnimate()
    const router = useRouter()
    const { animeId } = router.query

    const [currentAnime, setCurrentAnime] = useState({Nome: "non trovato", Trama: "non trovato", Copertina: "non trovato", Stato: "non trovato", Uscita: "non trovato", Generi: "non trovato"})
    const [currentAnimeButton, setCurrentAnimeButton] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [currentVideo, setCurrentAnimeVideo] = useState('')

    useEffect(() => {
        document.getElementById("serchIco").style.display = "flex";
        if(isBrowser){
            var vid = document.getElementById("myVideo");
            vid.onplay = function() {
                document.getElementById("myVideoBack").play()
            };
            vid.onpause = function() {
                document.getElementById("myVideoBack").pause()
            };
            vid.ontimeupdate = function() {
                document.getElementById("myVideoBack").currentTime = vid.currentTime
            };
        }
    }, [])

    useEffect(() => {
        fetch('/api/findAnime/' + animeId)
        .then((res) => res.json())
        .then((data1) => {
            setCurrentAnime(data1[0])
            if(data1[0].IdAW != undefined){
                fetch('/api/findAnimeButton/' + data1[0].IdAW)
                    .then((res) => res.json())
                    .then((data2) => {
                        setCurrentAnimeButton(data2)
                        setLoading(false)
                    })
            }
            
        })
        
    }, [animeId])

    const openVideo = async (prop) => {
        const req = await fetch('/api/findAnimeVideo/'+currentAnime.IdAW+'/'+prop);
        const newData = await req.json();
    
        setCurrentAnimeVideo(newData[0]);
    };

    

    return (
        <div ref={animationParent}>
            <Head>
                <title>AnimeCrowd</title>
                <meta name="description" content="Anime in streaming e download SUB ITA e ITA" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,200" />
            </Head>

            <br></br>
            {isLoading == true ?
            <div style={{width: '-webkit-fill-available', flexDirection: 'column-reverse', position: 'absolute', top: '0px', left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', height: '100vh', zIndex: '9999', display: 'flex', flexWrap: 'nowrap'}}>
                <Image className="heartbeat" src={loadingGIF} style={{width: '100px', height: 'auto'}}/> 
                <br></br>
            </div>
            : null}

            {currentAnime == "nessun risultato" ? <h1>Anime non trovato</h1> : null}

            <div style={{position: 'fixed', height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(50px)', zIndex: '-1'}}></div>

            <div style={{backgroundClip: 'content-box', padding: '1px', width: '100%', position: 'relative', marginTop: '-20px', zIndex: '-1'}}>
                <img alt={'Copertina di '+ currentAnime.Nome} src={currentAnime.Banner == '' ? 'https://www.ammotor.it/wp-content/uploads/2017/12/default_image_01-1024x1024-570x321.png' : currentAnime.Banner} style={{opacity: .5, objectFit: 'cover', width: '100%', height: '50vh', position: 'relative', zIndex: '100'}}/> 
                <div variant="contained" className="videoHome"></div>
                <style jsx global>
                    {`
                        .videoHome {
                            left: -1px;
                            width: -webkit-fill-available;
                            position: absolute;
                            top: 0;
                            height: 100%;

                            background: linear-gradient(0deg, rgba(0,0,0,1) 33%, rgba(255,255,255,0) 100%);
                            z-index: 200;
                        }
                        .btnPlayCopertina:hover {
                                -webkit-text-decoration: none;
                                text-decoration: none;
                                background-color: rgb(220 135 255);
                                box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
                            }
                        }
                    `}
                </style>
            </div>
            <Container style={{padding: '50px', marginTop: '-200px', zIndex: '999999'}} maxWidth="lg">

                <center>

                    <CardMedia
                        component="img"
                        sx={{ width: 200, borderRadius: '15px', }}
                        style={{objectFit: 'cover', height: '270px'}}
                        image={currentAnime.Copertina}
                        alt={'Copertina di '+ currentAnime.Nome}
                    />
                    
                    
                    <h1 style={{fontFamily: 'Work Sans, sans-serif', textTransform: 'uppercase', fontWeight: 'extrabold'}}><strong>{currentAnime.Nome}</strong></h1>

                    

                </center>
                <br></br>

                    <center>
                        <table style={{width: '100%', textAlign: 'center', tableLayout: 'fixed', opacity: '0.5'}}>
                            <tbody>
                                <tr>
                                    <th>STATO</th>
                                    <th>USCITA</th>
                                </tr>
                                <tr>
                                    <td>{currentAnime.Stato}</td>
                                    <td>{currentAnime.Uscita}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{width: '100%', textAlign: 'center', tableLayout: 'fixed', opacity: '0.5'}}>
                            <tbody>
                                <tr>
                                    <th>GENERI</th>
                                </tr>
                                <tr>
                                    <td>{currentAnime.Generi}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <br></br>
                        <table style={{width: '100%', textAlign: 'center', tableLayout: 'fixed', opacity: '0.5'}}>
                            <tbody>
                                <tr>
                                    <th>TRAMA</th>
                                </tr>
                                <tr>
                                    <td><p style={{fontFamily: 'Work Sans, sans-serif', textAlign: 'justify', textAlignLast: 'center'}}>{currentAnime.Trama}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                


                <br></br>
                <br></br>
                <center style={{zIndex: '1'}}>
                <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>

                    {currentAnimeButton.map((_, index) => (
                        <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                            <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '100%', borderRadius: '15px', }} key={index} onClick={() => openVideo(_.src)}>
                                <PlayArrowRoundedIcon sx={{ color: 'black', fontSize: 25 }}/><strong>EP {_._id}</strong>
                            </Button>
                        </Grid>
                    ))}

                </Grid>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                        
                    <div>
                        
                            <video id="myVideo" controls style={{width: '100%', zIndex: '2', marginTop: '30px'}} src={currentVideo}></video> 
                        
                            <div style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -70vh)', zIndex: '-2'}}>
                                <video id="myVideoBack" muted style={{width: '1200px', borderRadius: '100px'}} src={currentVideo}></video> 
                            </div>    
                    </div>
                        
                        
                        
                </center>
            </Container>

            
            
        </div>
    )
}

export default AnimePage