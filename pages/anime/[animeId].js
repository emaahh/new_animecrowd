import React, { useRef, useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import loadingGIF from '/public/loadingGIF.gif'

import Grid from '@mui/material/Grid';


function AnimePage() {
    const router = useRouter()
    const { animeId } = router.query

    const [currentAnime, setCurrentAnime] = useState([])
    const [currentAnimeButton, setCurrentAnimeButton] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [currentVideo, setCurrentAnimeVideo] = useState('')

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
        <>
            <Head>
                <title>AnimeCrowd</title>
                <meta name="description" content="Anime in streaming e download SUB ITA e ITA" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,200" />
            </Head>

            <br></br>
            {isLoading == true ?
            <div style={{flexDirection: 'column-reverse', position: 'absolute', top: '0', left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', width: '100%', height: '100vh', zIndex: '9999', display: 'flex', flexWrap: 'nowrap'}}>
                <Image src={loadingGIF} style={{width: '100px', height: 'auto'}}/> 
                <br></br>
            </div>
            : null}

            {currentAnime == "nessun risultato" ? <h1>Anime non trovato</h1> : null}


            <center>
                <h1 style={{fontFamily: 'Work Sans, sans-serif', cursor: 'pointer', textTransform: 'uppercase'}}>{currentAnime.Nome}</h1>
                
                {currentAnimeButton.map((_, index) => (
                
                    <button key={index} onClick={() => openVideo(_.src)}>{_.src}</button>
                    
                ))}
                <br></br>
                <br></br>

                <video controls src={currentVideo}></video>


            </center>


            
            
        </>
    )
}

export default AnimePage