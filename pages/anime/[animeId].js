import React, { useRef, useState, useEffect } from "react";
import Script from 'next/script'
import Head from 'next/head'
import { NextSeo } from 'next-seo';
import { RecipeJsonLd } from 'next-seo';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Loading from '/components/Loading'

import {useAutoAnimate} from '@formkit/auto-animate/react'

import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import HeartBrokenRoundedIcon from '@mui/icons-material/HeartBrokenRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import CardComponent from '/components/CardComponent';


import {UserContext} from '../_app'


import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { Rule } from "@mui/icons-material";


function AnimePage() {
    const unique_id = new Date().getTime();
    const valueee = React.useContext(UserContext);  
    const [animationParent] = useAutoAnimate()
    const router = useRouter()
    const { animeId } = router.query

    const queryEpInput = useRef(null);

    const [currentAnime, setCurrentAnime] = useState({Nome: "non trovato", Trama: "Guarda ora gratis", Copertina: "non trovato", Stato: "non trovato", Uscita: "non trovato", Generi: "non trovato"})
    const [currentAnimeButton, setCurrentAnimeButton] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [currentEpisode, setCurrentEpisode] = useState(-1)
    const [autoPlay, setAutoPlay] = useState(false)
    const [currentVideo, setCurrentAnimeVideo] = useState('')
    const [TitleButt, setTitleButt] = useState('')
    const [queryEp, setQueryEp] = useState('')
    const [resultEp, setResultEp] = useState([])

    const [allAnime, setAllAnime] = useState([])
    const [correlati, setCorrelati] = useState([])

    const [listState, setListState] = useState(null)
    const [favorite, setFavorite] = useState(false)

    const [isLog, setIsLog] = useState(false);
    const [accountData, setAccountData] = useState(undefined);

    const [currVidId, setCurrVidId] = useState('');

    function LogIn(emailPROPS, passwordPROPS) {
        fetch('/api/logIn/'+emailPROPS+'/'+passwordPROPS)
        .then(data => data.json()).then(data => {
            setAccountData(data)
            setIsLog(true)
            setTimeout(() => {
                console.log('ddddddddd')
                    if(data[0].Lista){
                        data[0].Lista.map((_, index) => {
                            if(_._id == animeId){
                                setListState(_.state)
                            }
                        })
                    }
                    if(data[0].Preferiti){
                        data[0].Preferiti.map((_, index) => {
                            if(_._id == animeId){
                                setFavorite(true)
                            }
                        })
                    }

            }, 1000);
        })
    }
    useEffect(() => {
        if(valueee.isLogStored == 1 && accountData==undefined){
            setTimeout(() => {
                LogIn(getCookie('email'),getCookie('password'))
            }, 500)
            

        }else if(valueee.isLogStored == 0){
            if(accountData===undefined){
                setIsLog(false)
            }else{
                setAccountData(undefined)
                setIsLog(false)
            }
            
        }

    })


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
        setListState(null)
        setFavorite(false)
        setAccountData(undefined)
        setLoading(true)
        setCorrelati([])

        fetch('/api/allanimeapi')
            .then((res) => res.json())
            .then((data) => {
                setAllAnime(data)
            })

        fetch('/api/findAnime/' + animeId)
            .then((res) => res.json())
            .then((data1) => {
                setCurrentAnime(data1[0])
                if(data1[0].Stato != 'Non rilasciato'){
                    if(data1[0].IdAW != undefined){

                        setLoading(false)
                        fetch('/api/findAnimeButton/' + data1[0].IdAW)
                            .then((res) => res.json())
                            .then((data2) => {
                                setCurrentAnimeButton(data2)
                                setCurrentEpisode(-1)
                                setCurrentAnimeVideo('')
                            })
                    }else if(data1[0].IdHW != undefined){
                        setLoading(false)
                        fetch('/api/findAnimeButtonHENTAI/' + data1[0].IdHW)
                            .then((res) => res.json())
                            .then((data2) => {
                                setCurrentAnimeButton(data2)
                                setCurrentEpisode(-1)
                                setCurrentAnimeVideo('')
                            })
                    }
                }else{
                    setLoading(false)
                }
                
            })
        
    }, [animeId])

    useEffect(() => {
        setCorrelati([])
        setTimeout(() => {
            setCorrelati([])
            console.log(correlati)
            
            allAnime.map((_, index) => {
                if(_.Nome.indexOf(currentAnime.Nome) > -1 && _._id != currentAnime._id || currentAnime.Nome.indexOf(_.Nome) > -1 && _._id != currentAnime._id){
                    console.log(_.Nome)
                    setCorrelati(correlati => [...correlati, _])
                }
            }) 

        }, 1000);

    }, [isLoading==false]);

    const openVideo = async (epnum, prop, title) => {
        if(currentAnime.IdAW != undefined){

            const req = await fetch('/api/findAnimeVideo/'+currentAnime.IdAW+'/'+prop);
            const newData = await req.json();
        
            setCurrentAnimeVideo(newData[0]);
            setCurrentEpisode(epnum)
            setTitleButt(title)
            setTimeout(() => {
                document.getElementById('playersWrapper').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            }, 500);

        }else if(currentAnime.IdHW != undefined){
            setCurrVidId("https://www.hentaiworld.me/ajax/episode/serverPlayer?id="+prop+"&amp;a.url=https://www.hentaiworld.me/assets/acode/aplayer.html?random=2065099624&amp;a.close=1&amp;ui=rAxi56rr6%40IDmImGdLl0xuFSuPSVV%2FvGplG9Jt2x&amp;autostart=true")
            const req = await fetch('/api/findAnimeVideoHENTAI/'+currentAnime.IdHW+'/'+prop);
            const newData = await req.json();
        
            setCurrentAnimeVideo(newData[0]);
            setCurrentEpisode(epnum)
            setTitleButt(title)
            setTimeout(() => {
                document.getElementById('playersWrapper').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            }, 500);

        }
        
        
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

    //menu lista
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    function handleClose(param){
        setAnchorEl(null);
        if(param == 0){
            // da guaardare
            setListState(0)
            fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
        }else if(param == 1){
            // in corso
            setListState(1)
            fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
        }else if(param == 2){
            // completato
            setListState(2)
            fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
        }else if(param == 3){
            // droppato
            setListState(3)
            fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
        }else if(param == 4){
            // preferito
            setFavorite(true)
            fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
        }else if(param == 5){
            // rimuovi
            setListState(null)
            fetch("/api/removeToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
        }else if(param == 6){
            // non preferito
            setFavorite(false)
            fetch("/api/removeToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
        }
    }
    /*
    const handleClose = (param) => {
        setAnchorEl(null);
        switch (param) {
            case 0:
                // da guaardare
                setListState(0)
                fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
                break;
            case 1:
                // in corso
                setListState(1)
                fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
                break;
            case 2:
                // completato
                setListState(2)
                fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
                break;
            case 3:
                // droppato
                setListState(3)
                fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
                break;
            case 4:
                // preferito
                setFavorite(true)
                fetch("/api/addToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
                break;
            case 5:
                // rimuovi
                setListState(null)
                fetch("/api/removeToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
                break;
            case 6:
                // non preferito
                setFavorite(false)
                fetch("/api/removeToList/"+ getCookie('email') + '/' + getCookie('password') + '/' + animeId + '/' + param)
                break;
            
        }
    };
    */

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
                    openVideo(currentEpisode+1, currentAnimeButton[currentEpisode+1].src, currentAnimeButton[currentEpisode+1].title)
                }
            };
        }else if(currentEpisode+1==currentAnimeButton.length){
            setAutoPlay(false)
        }
    }

    {/* TODO */}
    useEffect(() => {
        let interval = setInterval(() => {

            if(currentEpisode!=-1){
                var video = document.getElementById("myVideo");
                if (video.paused) {
                    console.log("video is stopped");
                    //DO SOMETING...
                } else {
                    console.log("video is playing");
                     
                    console.log("mando al db"); 
                    
                }
            }

        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, [currentEpisode]);

    function serchingEp(event){
        
            setQueryEp(event.target.value)

    }

    useEffect(() => {

            let result = currentAnimeButton.filter(el => el.title.indexOf(String(queryEp)) != -1);
            setResultEp(result)

    }, [queryEp]);
    

    return (
        <div ref={animationParent}>
            <Head>
                
                
                <meta name="description" content={currentAnime.Trama} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={"Anime, Naruto, Onepiece, Episodi, Puntate, Toriko, Kuroko, Inazuma, Oav, Film, Faunsub, Traduttori, Fairy, Tail, bleach, hunter, sword, art, online, pokémon, infinite, stratos, log, horizon, blazblue, tokyo, ravens, soul, eater, outbreak, company, ecchi, dragon, ball, super, fullmetal, quanzhi, fashi, anime streaming, anime sub ita, anime ita, AnimeUnity, Anime Streaming, Anime Streaming ITA, Streaming Anime SUB ITA, Streaming Anime ITA, Lista Anime ITA, Lista Anime SUB ITA, " + currentAnime.Nome + " SUB ITA, " + currentAnime.Nome + " ITA, " + currentAnime.Nome + " Episodi ITA Download e Streaming, " + currentAnime.Nome + " Episodi SUB ITA Download e Streaming, " + currentAnime.Nome + " Episodi ITA Streaming Online, " + currentAnime.Nome + " Episodi SUB ITA Streaming Online, " + currentAnime.Nome + " SUB ITA Lista episodi, " + currentAnime.Nome + " ITA Lista episodi, " + currentAnime.Nome + " Streaming Lista episodi, " + currentAnime.Nome + " Download Lista episodi, " + currentAnime.Nome + " Download SUB ITA, " + currentAnime.Nome + " Download ITA, " + currentAnime.Nome + " Streaming SUB ITA, " + currentAnime.Nome + " Streaming ITA, " + currentAnime.Nome + " Episodi ITA, " + currentAnime.Nome + " Episodi SUB ITA, " + currentAnime.Nome + " sub ita streaming, " + currentAnime.Nome + " ita streaming, " + currentAnime.Nome + " AnimeUnity, " + currentAnime.Nome + " AnimeUnity, " + currentAnime.Nome + " AnimeOra, " + currentAnime.Nome + " Fairytailitalia, " + currentAnime.Nome + " AnimeWorld, " + currentAnime.Nome + " DreamSub, " + currentAnime.Nome + " Animeleggendari, " + currentAnime.Nome + " AnimeLove, " + currentAnime.Nome + " AnimeSaturn"}/>
                <meta property="og:image" content={currentAnime.Copertina}></meta>
                <meta name="author" content="AnimeCrowd Staff"></meta>
                <meta name="msapplication-TileColor" content="#000000"></meta>
                <meta name="theme-color" content="#000000"></meta>


                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,200" />

            </Head>

            <NextSeo
                title={currentAnime.Nome != "non trovato"? currentAnime.Nome + " Streaming & Download SUB ITA - AnimeCrowd" : "Streaming & Download SUB ITA - AnimeCrowd"}
                description={currentAnime.Trama}
            />
            <RecipeJsonLd 
                keywords={"Anime, Naruto, Onepiece, Episodi, Puntate, Toriko, Kuroko, Inazuma, Oav, Film, Faunsub, Traduttori, Fairy, Tail, bleach, hunter, sword, art, online, pokémon, infinite, stratos, log, horizon, blazblue, tokyo, ravens, soul, eater, outbreak, company, ecchi, dragon, ball, super, fullmetal, quanzhi, fashi, anime streaming, anime sub ita, anime ita, AnimeUnity, Anime Streaming, Anime Streaming ITA, Streaming Anime SUB ITA, Streaming Anime ITA, Lista Anime ITA, Lista Anime SUB ITA, " + currentAnime.Nome + " SUB ITA, " + currentAnime.Nome + " ITA, " + currentAnime.Nome + " Episodi ITA Download e Streaming, " + currentAnime.Nome + " Episodi SUB ITA Download e Streaming, " + currentAnime.Nome + " Episodi ITA Streaming Online, " + currentAnime.Nome + " Episodi SUB ITA Streaming Online, " + currentAnime.Nome + " SUB ITA Lista episodi, " + currentAnime.Nome + " ITA Lista episodi, " + currentAnime.Nome + " Streaming Lista episodi, " + currentAnime.Nome + " Download Lista episodi, " + currentAnime.Nome + " Download SUB ITA, " + currentAnime.Nome + " Download ITA, " + currentAnime.Nome + " Streaming SUB ITA, " + currentAnime.Nome + " Streaming ITA, " + currentAnime.Nome + " Episodi ITA, " + currentAnime.Nome + " Episodi SUB ITA, " + currentAnime.Nome + " sub ita streaming, " + currentAnime.Nome + " ita streaming, " + currentAnime.Nome + " AnimeUnity, " + currentAnime.Nome + " AnimeUnity, " + currentAnime.Nome + " AnimeOra, " + currentAnime.Nome + " Fairytailitalia, " + currentAnime.Nome + " AnimeWorld, " + currentAnime.Nome + " DreamSub, " + currentAnime.Nome + " Animeleggendari, " + currentAnime.Nome + " AnimeLove, " + currentAnime.Nome + " AnimeSaturn"}
            />

            <br></br>

            {isLoading != true ?
                <Loading/>
            : 
                <>
                
                    {currentAnime == "nessun risultato" ? <h1>Anime non trovato</h1> : null}

                    <div style={{position: 'fixed', height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(50px)', zIndex: '-1'}}></div>

                    <div style={{backgroundClip: 'content-box', padding: '1px', width: '100%', position: 'relative', marginTop: '-20px', zIndex: '-1'}}>
                        <Image className="imagebann" alt={'Copertina di '+ currentAnime.Nome} src={currentAnime.Banner == '' ? 'https://www.ammotor.it/wp-content/uploads/2017/12/default_image_01-1024x1024-570x321.png' : currentAnime.Banner} style={{opacity: .5, objectFit: 'cover', width: '100%', height: '50vh', position: 'relative', zIndex: '100'}}/> 
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
                            
                            <h1 style={{fontFamily: 'Work Sans, sans-serif', textTransform: 'uppercase', fontWeight: 'extrabold'}}><strong>{currentAnime.Nome}&nbsp;{favorite? <FavoriteRoundedIcon/> : null}</strong></h1>
                            
                            {isLog ?
                                currentAnime.IdAW != undefined?
                                    <> 
                                        <Fab sx={{ml: 1, height: '40px'}} variant="extended" color={"success"} ria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                                            <strong>MODIFICA LA TUA CROWDLIST</strong> &nbsp; <ArrowDropDownRoundedIcon sx={{fontSize: '30px', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px'}}/>
                                        </Fab>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            {listState==null?
                                                <>
                                                    <MenuItem onClick={()=>handleClose(0)}><BookmarkAddRoundedIcon/> &nbsp; Da guardare</MenuItem>
                                                    <MenuItem onClick={()=>handleClose(1)}><RemoveRedEyeIcon/> &nbsp; In corso</MenuItem>
                                                    <MenuItem onClick={()=>handleClose(2)}><CheckIcon/> &nbsp; Completato</MenuItem>
                                                    <MenuItem onClick={()=>handleClose(3)}><VisibilityOffIcon/> &nbsp; Droppato</MenuItem>
                                                </>
                                                : 
                                                <MenuItem onClick={()=>handleClose(5)}><DeleteRoundedIcon/> &nbsp; Rimuovi dalla lista</MenuItem>
                                            }
                                            

                                            <Divider />

                                            {favorite?
                                                <MenuItem onClick={()=>handleClose(6)}><HeartBrokenRoundedIcon/> &nbsp; Rimuovi dai preferiti</MenuItem>
                                                : 
                                                <MenuItem onClick={()=>handleClose(4)}><FavoriteRoundedIcon/> &nbsp; Aggiungi ai preferiti</MenuItem>
                                            }
                                            
                                        </Menu>
                                    </>
                                :null
                            :null

                            }
                            
                            <h5>
                                {isLog ?
                                    currentAnime.IdAW != undefined?
                                        listState == 0 ? 
                                            "Devi ancora guardare "+currentAnime.Nome : 
                                        listState == 1 ? 
                                            "Stai guardando "+currentAnime.Nome : 
                                        listState == 2 ? 
                                            "Complimenti! Hai finito "+currentAnime.Nome :
                                        listState == 3 ? 
                                            currentAnime.Nome + " è tra i tuoi droppati" :
                                        listState == null ? 
                                            currentAnime.Nome + " non si trova nella tua crowdlist" : null
                                    :null
                                :"Accedi per vedere e modificare la tua crowdlist"
                                }
                            </h5>

                            <br></br>
                            <br></br>
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
                            <br></br>
                            <br></br>
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

                        {
                            currentAnime.VM18 != 'si'?
                            null
                            :
                            <>
                                <Alert severity="error" style={{borderRadius: '15px'}}>
                                    <AlertTitle>Attenzione +18!</AlertTitle>
                                    Stai per vedere una serie <strong>vietata ad un publico minore</strong>
                                </Alert>
                                <br></br>
                            </>
                            
                        }

                        <center style={{zIndex: '1'}} >
                            <h3 style={{opacity: '.5'}}>{currentAnimeButton.length} EPISODI</h3>

                            {
                                currentAnime.IdAW != undefined?
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <SearchRoundedIcon class="ICOW" sx={{ color: 'white', mr: 1, my: 0.5  }}/>
                                        <TextField value={queryEp} className="queryEpInput" id="input-with-sx" label="CERCA EPISODIO" variant="standard" onChange={serchingEp} ref={queryEpInput}/>
                                        <CancelRoundedIcon class="ICOW" sx={{ color: 'white', mr: 1, my: 0.5  }} onClick={()=> setQueryEp('')}/>
                                    </Box>
                                :null

                            }
                            

                            <br></br>
                            <br></br>
                            <br></br>

                            <Box sx={{ width: '100%', typography: 'body1' }} ref={animationParent}>

                                <Grid className="hidd" container columns={{ xs: 100, sm: 100, md: 100 }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxHeight: '50vh',overflow: 'scroll',  overflowX: 'scroll'}}>
                                    {queryEp != ''? 
                                        resultEp.map((_, index) => (
                                        
                                            <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: 'auto', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src, _.title)}>
                                                    <strong>EP {_.title}</strong>
                                                </Button>
                                            </Grid>
                                                
                                        ))
                                        :
                                        currentAnimeButton.map((_, index) => (
                                        
                                            <Grid item key={index} style={{maxWidth: '400px', padding: '5px'}}>
                                                <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{width: 'auto', borderRadius: '15px', }} key={index} onClick={() => openVideo(_._id, _.src, _.title)}>
                                                    <strong>EP {_.title}</strong>
                                                </Button>
                                            </Grid>
                                                
                                        ))
                                    }

                                </Grid>
                                {
                                    currentAnime.Stato == 'Non rilasciato'||currentAnimeButton.length==0?
                                      <>
                                             <br></br>
                                            <Alert severity="info" style={{borderRadius: "15px", justifyContent: 'center'}}>
                                                 <strong>ATTENZIONE</strong> questa serie non è stata ancora rilasciata, <a href={'https://t.me/AnimeCrowd'} target="_blank" rel="noreferrer"><strong>clicca qui per tenerti aggiornato!</strong></a>
                                            </Alert>
                                        </>
                                    :
                                    null
                                }
                                
                            </Box>

                            <div ref={animationParent} id="playersWrapper">
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                {currentEpisode!=-1?
                                    <div ref={animationParent}>
                                        
                                            <h1 ref={animationParent} style={{opacity: '.5'}}>EPISODIO {TitleButt}</h1> 
                                            
                                        {currentAnime.IdHW && currVidId?
                                            
                                            
                                            null
                                            :
                                            <video onEnded={videoEnd} poster={'/videoCover2.png'} id="myVideo" controls style={{width: '100%', height: '600px', zIndex: '2', marginTop: '30px'}} src={currentVideo}></video>

                                        }
                                        

                                        <br></br>
                                        <br></br>
                                        <div style={{display: 'inline'}} ref={animationParent}>
                                            {currentEpisode>0 && currentEpisode!= -1 ?
                                                <Fab style={{float: 'left', marginRight: '10px'}} variant="extended" onClick={() => openVideo(currentEpisode-1, currentAnimeButton[currentEpisode-1].src, currentAnimeButton[currentEpisode-1].title)}>
                                                    <SkipPreviousIcon/>
                                                </Fab>
                                                :null
                                            }
                                                
                                            {currentEpisode+1==currentAnimeButton.length || currentEpisode== -1 ?
                                                null
                                                :
                                                <Fab style={{float: 'left'}} variant="extended" onClick={()=> openVideo(currentEpisode+1, currentAnimeButton[currentEpisode+1].src, currentAnimeButton[currentEpisode+1].title)}>
                                                    <SkipNextIcon/>
                                                </Fab>
                                            }
                                         {currentAnime.IdHW?
                                            null:
                                            <FormControlLabel
                                                ref={animationParent}
                                                style={{float: 'right', paddingTop: '4px'}}
                                                control={<IOSSwitch sx={{ m: 1}} checked={autoPlay} onChange={autoPlayActiveDeactive}/>}
                                                label={"AUTOPLAY"}
                                                labelPlacement="bottom"
                                                
                                            />}
                                        </div>
                                            

                                        <div id="myVideoBackWrapp" style={{position: 'absolute', zIndex: '-2', marginTop: '-675px', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <video id="myVideoBack" muted style={{width: '100vw', height: '650px', borderRadius: '100px'}} src={currentVideo}></video> 
                                        </div>
                                    </div>
                                    :null  
                                }
                            </div>
                        </center>
                    </Container>
                    
                    {correlati.length>0? 
                        <>
                            <strong><h1 id="altriephead" style={{paddingLeft: '4.5vw', fontFamily: 'Work Sans, sans-serif'}}>ALTRI DELLA SERIE</h1></strong>
                            <br></br>

                            <Grid container columns={{ xs: 100, sm: 100, md: 100 }} style={{paddingLeft: '2vw', paddingRight: '2vw', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                                    
                                        
                                {correlati.map((_, index) => (
                                    <Grid item key={index} style={{maxWidth: '400px'}}>
                                        <CardComponent EPISODE={true} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                    </Grid>
                                ))}
                            
                                    

                            </Grid>
                        </>
                    :null}

                    

                    <Container style={{padding: '50px', marginTop: '-200px', zIndex: '999999'}} maxWidth="lg">
                        <center>

                            <br></br>


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

                                <p style={{fontFamily: 'Work Sans, sans-serif', fontWeight: 'extrabold'}}>Aggiunto al sito da <strong style={{textTransform: 'uppercase'}}>{currentAnime.Richiedente}</strong></p>
                                
                                <br></br>
                                
                                                                
                                {currentAnime.Nome} AnimeCrowd - {currentAnime.Nome} Anime Crowd - {currentAnime.Nome} Gratis - {currentAnime.Nome} SUB ITA - {currentAnime.Nome} ITA - Streaming {currentAnime.Nome} Episodio 5 - Download {currentAnime.Nome} Episodio 5 - {currentAnime.Nome} Episodi ITA Download e Streaming - {currentAnime.Nome} Episodi SUB ITA Download e Streaming - {currentAnime.Nome} Episodi ITA Streaming Online - {currentAnime.Nome} Episodi SUB Streaming Online - {currentAnime.Nome} SUB ITA Lista episodi - {currentAnime.Nome} ITA Lista episodi - {currentAnime.Nome} Streaming Lista episodi - {currentAnime.Nome} Download Lista episodi - {currentAnime.Nome} Download SUB ITA - {currentAnime.Nome} Download ITA - {currentAnime.Nome} Streaming SUB ITA - {currentAnime.Nome} Streaming ITA - {currentAnime.Nome} Episodi ITA - {currentAnime.Nome} Episodi SUB ITA - {currentAnime.Nome} AnimeUnity - {currentAnime.Nome} AnimeWorld - {currentAnime.Nome} DreamSub - {currentAnime.Nome} Animeleggendari - {currentAnime.Nome} AnimeLove - {currentAnime.Nome} AnimeSaturn
                            </p>
                                
                        </center>

                    </Container>

                </>
            }

            <div id="ts_ad_native_msor2"></div>
            <Script
                src={`//cdn.runative-syndicate.com/sdk/v1/n.js?cacheControl=${new Date().getTime()}`}
                onLoad={() => {
                    NativeAd({
                        element_id: "ts_ad_native_msor2",
                        spot: "8cadf2d386f0498f9ab99b1f19f718f7",
                        type: "label-under",
                        cols: 6,
                        rows: 1,
                        title: "",
                        titlePosition: "left",
                        adsByPosition: "right",
                        breakpoints: [
                                {
                                            "cols": 2,
                                            "width": 770
                                }
                        ],
                    });
                }}
            />
            
        </div>
    )
}

export default AnimePage