import React, { useRef, useState, useEffect } from "react";
import Head from 'next/head'
import { useRouter } from 'next/router'

import Loading from '/components/Loading'

import {useAutoAnimate} from '@formkit/auto-animate/react'

import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'

import Box from '@mui/material/Box';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';




function AnimePage() {
    
    const [animationParent] = useAutoAnimate()
    const router = useRouter()
    const { animeId } = router.query

    const [currentAnime, setCurrentAnime] = useState({Nome: "non trovato", Trama: "non trovato", Copertina: "non trovato", Stato: "non trovato", Uscita: "non trovato", Generi: "non trovato"})
    const [currentAnimeButton, setCurrentAnimeButton] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [currentEpisode, setCurrentEpisode] = useState(-1)
    const [autoPlay, setAutoPlay] = useState(false)
    const [currentVideo, setCurrentAnimeVideo] = useState('')


    //ragruppamento bottoni ep
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //ragruppamento bottoni ep

    useEffect(() => {
        document.getElementById("serchIco").style.display = "flex";
        if(isBrowser && currentEpisode!=-1){
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
        if(isMobile && currentEpisode!=-1){
            document.getElementById("myVideoBackWrapp").style = 'display: none!important;';
        }
    }, [currentEpisode])

    useEffect(() => {
        setLoading(true)
        fetch('/api/findAnime/' + animeId)
            .then((res) => res.json())
            .then((data1) => {
                setCurrentAnime(data1[0])
                if(data1[0].IdAW != undefined){
                    fetch('/api/findAnimeButton/' + data1[0].IdAW)
                        .then((res) => res.json())
                        .then((data2) => {
                            setCurrentAnimeButton(data2)
                            setCurrentEpisode(-1)
                            setCurrentAnimeVideo('')
                            setTimeout(() => {
                                setLoading(false)
                            }, 1000);
                        })
                }
            })
        
    }, [animeId])

    const openVideo = async (epnum, prop) => {
        const req = await fetch('/api/findAnimeVideo/'+currentAnime.IdAW+'/'+prop);
        const newData = await req.json();
    
        setCurrentAnimeVideo(newData[0]);
        setCurrentEpisode(epnum)
        setTimeout(() => {
            document.getElementById('playersWrapper').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }, 500);
        
    };

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
        ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
    }));

    function autoPlayActiveDeactive(){
        var vid = document.getElementById("myVideo");
        if(autoPlay == false){
            setAutoPlay(true)
        }else{
            setAutoPlay(false)
            vid.autoplay = false
        }
    }

    function videoEnd(){
        if(currentEpisode!=-1&&currentEpisode+1!=currentAnimeButton.length){
            var vid = document.getElementById("myVideo");
            vid.onended = function() {
                if(autoPlay){
                    console.log("dsdasd")
                    vid.autoplay = true
                    openVideo(currentEpisode+1, currentAnimeButton[currentEpisode+1].src)
                }
            };
        }else if(currentEpisode+1==currentAnimeButton.length){
            setAutoPlay(false)
        }
    }
    

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
                <Loading/>
            : 
                <>
                
                    {currentAnime == "nessun risultato" ? <h1>Anime non trovato</h1> : null}

                    <div style={{position: 'fixed', height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(50px)', zIndex: '-1'}}></div>

                    <div style={{backgroundClip: 'content-box', padding: '1px', width: '100%', position: 'relative', marginTop: '-20px', zIndex: '-1'}}>
                        <img className="imagebann" alt={'Copertina di '+ currentAnime.Nome} src={currentAnime.Banner == '' ? 'https://www.ammotor.it/wp-content/uploads/2017/12/default_image_01-1024x1024-570x321.png' : currentAnime.Banner} style={{opacity: .5, objectFit: 'cover', width: '100%', height: '50vh', position: 'relative', zIndex: '100'}}/> 
                        <div variant="contained" className="videoHome"></div>
                        <style>
                            {`
                                .imagebann{
                                    -webkit-mask-image: linear-gradient(black 50%, transparent);
                                    mask-image: linear-gradient (black 50%, transparent);
                                }
                                .videoHome {
                                    left: -1px;
                                    width: -webkit-fill-available;
                                    position: absolute;
                                    top: 0;
                                    height: 100%;

                                    -webkit-mask-image: linear-gradient(black, transparent);
                                    mask-image: linear-gradient (black, transparent);
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


                            <br></br>

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

                        <center style={{zIndex: '1'}} >
                            <h3 style={{opacity: '.5'}}>EPISODI</h3>
                            <br></br>

                            <Box sx={{ width: '100%', typography: 'body1' }} ref={animationParent}>
                                <TabContext value={value} ref={animationParent}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            {(() => {
                                                if(currentAnimeButton.length <= 100){
                                                    return <><Tab label={"1 - "+ currentAnimeButton.length} value="1" onClick={()=> handleChange(1, '1')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 200){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label={"100 - "+ currentAnimeButton.length} value="2" onClick={()=> handleChange(1, '2')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 300){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label={"200 - "+ currentAnimeButton.length} value="3" onClick={()=> handleChange(1, '3')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 400){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label={"300 - "+ currentAnimeButton.length} value="4"  onClick={()=> handleChange(1, '4')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 500){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label={"400 - "+ currentAnimeButton.length} value="5" onClick={()=> handleChange(1, '5')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 600){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label="400 - 500" value="5" onClick={()=> handleChange(1, '5')}/><Tab label={"500 - "+ currentAnimeButton.length} value="6" onClick={()=> handleChange(1, '6')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 700){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label="400 - 500" value="5" onClick={()=> handleChange(1, '5')}/><Tab label="500 - 600" value="6" onClick={()=> handleChange(1, '6')}/><Tab label={"600 - "+ currentAnimeButton.length} value="7" onClick={()=> handleChange(1, '7')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 800){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label="400 - 500" value="5" onClick={()=> handleChange(1, '5')}/><Tab label="500 - 600" value="6" onClick={()=> handleChange(1, '6')}/><Tab label="600 - 700" value="7" onClick={()=> handleChange(1, '7')}/><Tab label={"700 - "+ currentAnimeButton.length} value="8" onClick={()=> handleChange(1, '8')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 900){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label="400 - 500" value="5" onClick={()=> handleChange(1, '5')}/><Tab label="500 - 600" value="6" onClick={()=> handleChange(1, '6')}/><Tab label="600 - 700" value="7" onClick={()=> handleChange(1, '7')}/><Tab label="700 - 800" value="8" onClick={()=> handleChange(1, '8')}/><Tab label={"800 - "+ currentAnimeButton.length} value="9" onClick={()=> handleChange(1, '9')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 1000){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label="400 - 500" value="5" onClick={()=> handleChange(1, '5')}/><Tab label="500 - 600" value="6" onClick={()=> handleChange(1, '6')}/><Tab label="600 - 700" value="7" onClick={()=> handleChange(1, '7')}/><Tab label="700 - 800" value="8" onClick={()=> handleChange(1, '8')}/><Tab label="800 - 900" value="9" onClick={()=> handleChange(1, '9')}/><Tab label={"900 - "+ currentAnimeButton.length} value="10" onClick={()=> handleChange(1, '10')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 1100){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label="400 - 500" value="5" onClick={()=> handleChange(1, '5')}/><Tab label="500 - 600" value="6" onClick={()=> handleChange(1, '6')}/><Tab label="600 - 700" value="7" onClick={()=> handleChange(1, '7')}/><Tab label="700 - 800" value="8" onClick={()=> handleChange(1, '8')}/><Tab label="800 - 900" value="9" onClick={()=> handleChange(1, '9')}/><Tab label="900 - 1000" value="10" onClick={()=> handleChange(1, '10')}/><Tab label={"1000 - "+ currentAnimeButton.length} value="11" onClick={()=> handleChange(1, '11')}/></>
                                                }
                                                else if(currentAnimeButton.length <= 1200){
                                                    return <><Tab label="1 - 100" value="1" onClick={()=> handleChange(1, '1')}/><Tab label="100 - 200" value="2" onClick={()=> handleChange(1, '2')}/><Tab label="200 - 300" value="3" onClick={()=> handleChange(1, '3')}/><Tab label="300 - 400" value="4"  onClick={()=> handleChange(1, '4')}/><Tab label="400 - 500" value="5" onClick={()=> handleChange(1, '5')}/><Tab label="500 - 600" value="6" onClick={()=> handleChange(1, '6')}/><Tab label="600 - 700" value="7" onClick={()=> handleChange(1, '7')}/><Tab label="700 - 800" value="8" onClick={()=> handleChange(1, '8')}/><Tab label="800 - 900" value="9" onClick={()=> handleChange(1, '9')}/><Tab label="900 - 1000" value="10" onClick={()=> handleChange(1, '10')}/><Tab label="1000 - 1100" value="11" onClick={()=> handleChange(1, '11')}/><Tab label={"1100 - "+ currentAnimeButton.length} value="12" onClick={()=> handleChange(1, '12')}/></>
                                                }
                                            })()}
                                        </TabList>

                                    </Box>

                                    <TabPanel value="1" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index<=99 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP <br></br> {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="2" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>99&&index<=199 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="3" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>199&&index<=299 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="4" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>299&&index<=399 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="5" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>399&&index<=499 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="6" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>499&&index<=599 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="7" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>599&&index<=699 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="8" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>699&&index<=799 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="9" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>799&&index<=899 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="10" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>899&&index<=999 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="11" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>999&&index<=1099 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="12" sx={{paddingLeft: '0px', paddingRight: '0px', margin: '-15px'}}>
                                        <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                            {currentAnimeButton.map((_, index) => (
                                                index>1099&&index<=1199 ? 
                                                <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                    <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: '15px', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src)}>
                                                        <strong>EP {_._id+1}</strong>
                                                    </Button>
                                                </Grid>
                                                : null
                                            ))}
                                        </Grid>
                                    </TabPanel>

                                </TabContext>
                            </Box>
                            
                            <div ref={animationParent} id="playersWrapper">
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                {currentEpisode!=-1?
                                    <div ref={animationParent}>
                                        
                                            <h1 ref={animationParent} style={{opacity: '.5'}}>EPISODIO {currentEpisode+1}</h1> 
                                            
                                        
                                        <video onEnded={videoEnd} poster={'/videoCover2.png'} id="myVideo" controls style={{width: '100%', height: '600px', zIndex: '2', marginTop: '30px'}} src={currentVideo}></video>
                                        <br></br>
                                        <br></br>
                                        <div style={{display: 'inline'}} ref={animationParent}>
                                            {currentEpisode>0 && currentEpisode!= -1 ?
                                                <Fab style={{float: 'left', marginRight: '10px'}} variant="extended" onClick={() => openVideo(currentEpisode-1, currentAnimeButton[currentEpisode-1].src)}>
                                                    <SkipPreviousIcon/>
                                                </Fab>
                                                :null
                                            }
                                                
                                            {currentEpisode+1==currentAnimeButton.length || currentEpisode== -1 ?
                                                null
                                                :
                                                <Fab style={{float: 'left'}} variant="extended" onClick={()=> openVideo(currentEpisode+1, currentAnimeButton[currentEpisode+1].src)}>
                                                    <SkipNextIcon/>
                                                </Fab>
                                            }

                                            <FormControlLabel
                                                ref={animationParent}
                                                style={{float: 'right', paddingTop: '4px'}}
                                                control={<IOSSwitch sx={{ m: 1}} checked={autoPlay} onChange={autoPlayActiveDeactive}/>}
                                                label={"AUTOPLAY"}
                                                labelPlacement="bottom"
                                                
                                            />
                                        </div>
                                            

                                        <div id="myVideoBackWrapp" style={{position: 'absolute', zIndex: '-2', marginTop: '-675px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <video id="myVideoBack" muted style={{width: '100vw', height: '650px', borderRadius: '100px'}} src={currentVideo}></video> 
                                        </div>
                                    </div>
                                    :null  
                                }
                            </div>

                            <p style={{opacity: '.2', marginTop: '100px'}}>
                            <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                {currentAnime.Nome} AnimeCrowd - {currentAnime.Nome} Anime Crowd - {currentAnime.Nome} Gratis - {currentAnime.Nome} SUB ITA - {currentAnime.Nome} ITA - Streaming {currentAnime.Nome} Episodio 5 - Download {currentAnime.Nome} Episodio 5 - {currentAnime.Nome} Episodi ITA Download e Streaming - {currentAnime.Nome} Episodi SUB ITA Download e Streaming - {currentAnime.Nome} Episodi ITA Streaming Online - {currentAnime.Nome} Episodi SUB Streaming Online - {currentAnime.Nome} SUB ITA Lista episodi - {currentAnime.Nome} ITA Lista episodi - {currentAnime.Nome} Streaming Lista episodi - {currentAnime.Nome} Download Lista episodi - {currentAnime.Nome} Download SUB ITA - {currentAnime.Nome} Download ITA - {currentAnime.Nome} Streaming SUB ITA - {currentAnime.Nome} Streaming ITA - {currentAnime.Nome} Episodi ITA - {currentAnime.Nome} Episodi SUB ITA - {currentAnime.Nome} AnimeUnity - {currentAnime.Nome} AnimeWorld - {currentAnime.Nome} DreamSub - {currentAnime.Nome} Animeleggendari - {currentAnime.Nome} AnimeLove - {currentAnime.Nome} AnimeSaturn
                            </p>
                                
                        </center>

                    </Container>

                </>
            }

        </div>
    )
}

export default AnimePage