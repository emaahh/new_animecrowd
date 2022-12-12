import React, { useRef, useState, useEffect } from "react";
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ScrollContainer from 'react-indiana-drag-scroll'

import Loading from '/components/Loading'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import LoginIcon from '@mui/icons-material/Login';
import CheckIcon from '@mui/icons-material/Check';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';


import {UserContext} from '../_app'

import CardComponent from '/components/CardComponent';
import { maxWidth } from "@mui/system";

function UtentePage() {

    const value = React.useContext(UserContext);  

    const [animationParent] = useAutoAnimate()
    const router = useRouter()
    const { utenteId } = router.query

    const [currentProfile, setCurrentProfile] = useState([{_id: 'o_id', NomeUtente: 'result[0].NomeUtente', Avatar: 'result[0].Avatar', DataAccount: 'result[0].DataAccount', Amici: [{}], MiSeguono: [{}], AnimeVisti: [{}], Badge: ''}])
    const [currFollowerCount, setCurrFollowerCount] = useState(0)

    const [isLoading, setLoading] = useState(true)

    const [isLog, setIsLog] = useState(false);
    const [accountData, setAccountData] = useState(undefined);

    const [utenteSeguito, setUtenteSeguito] = useState(false);
    const [override, setOverride] = useState('0');
    const [tiSegue, setTiSegue] = useState(false);

    const [animeDaGuardare, setAnimeDaGuardare] = useState(null)
    const [animeDaContinuare, setAnimeDaContinuare] = useState(null)
    const [animeCompletati, setAnimeCompletati] = useState(null)
    const [animeDroppati, setAnimeDroppati] = useState(null)

    const [animePreferiti, setAnimePreferiti] = useState(null)

    function LogIn(emailPROPS, passwordPROPS) {
        fetch('/api/logIn/'+emailPROPS+'/'+passwordPROPS)
        .then(data => data.json()).then(data => {
            setAccountData(data)
            if(currentProfile.Amici){
                setTiSegue(false)
                currentProfile.Amici.map(item => {
                    if(item._id!=undefined){
                        console.log(item._id + '///' + data[0]._id)
                        if(item._id == data[0]._id){
                            setTiSegue(true)
                        }
                    }
                })
            }
        })
    }
    /*
    
    //check credenziali
   

    //auto login
    useEffect(() => {
        if(hasCookie('email') && hasCookie('password')){
            if(isLog == false){
                LogIn(getCookie('email'),getCookie('password'))
            }
        }
    }, [])
*/
    useEffect(() => {
        setTimeout(()=>{
            if(accountData === undefined){

                

            }else if(accountData){

                accountData[0].Amici.map(item => {
                    if(item._id == currentProfile._id){
                        setUtenteSeguito(true)
                    }else{
                        setUtenteSeguito(false)
                    }
                })

                setTimeout(() => {
                    setIsLog(true)
                },500)

            }
        }, 1000)
    })

    useEffect(() => {
        let rr = [];
        let r2 = [];
        let r3 = [];
        let r4 = [];
        let r5 = [];
        if(currentProfile.Lista && animeDaGuardare==null && animeDaContinuare==null && animeCompletati==null && animeDroppati==null){
            currentProfile.Lista.map((_, index) => {

                if(_.state == 1){
                    fetch('/api/findAnime/' + _._id)
                    .then((res) => res.json())
                    .then((data1) => {
                    let e = data1[0];
                    rr.push(e)
                    })
                }
                if(_.state == 0){
                    fetch('/api/findAnime/' + _._id)
                    .then((res) => res.json())
                    .then((data1) => {
                    let e2 = data1[0];
                    r2.push(e2)
                    })
                }
                if(_.state == 2){
                    fetch('/api/findAnime/' + _._id)
                    .then((res) => res.json())
                    .then((data1) => {
                    let e3 = data1[0];
                    r3.push(e3)
                    })
                }
                if(_.state == 3){
                    fetch('/api/findAnime/' + _._id)
                    .then((res) => res.json())
                    .then((data1) => {
                    let e4 = data1[0];
                    r4.push(e4)
                    })
                }
                if(index+1 == currentProfile.Lista.length){
                    setAnimeDaContinuare([])
                    setAnimeDaGuardare([])
                    setAnimeCompletati([])
                    setAnimeDroppati([])

                    setAnimeDaContinuare(rr)
                    setAnimeDaGuardare(r2)
                    setAnimeCompletati(r3)
                    setAnimeDroppati(r4)

                    console.log(animeDaGuardare)
                    console.log(animeDaContinuare)
                    console.log(animeCompletati)
                    console.log(animeDroppati)
                }

            });
        }
        if(currentProfile.Preferiti && animePreferiti==null){
            currentProfile.Preferiti.map((_, index) => {

                
                fetch('/api/findAnime/' + _._id)
                .then((res) => res.json())
                .then((data1) => {
                    let e5 = data1[0];
                    r5.push(e5)
                })
                
                if(index+1 == currentProfile.Preferiti.length){
                    setAnimePreferiti([])

                    setAnimePreferiti(r5)

                    console.log(animePreferiti)
                }

            });
        }
    })

    
    useEffect(() => {
            if(value.isLogStored == 1 && accountData==undefined){

                LogIn(getCookie('email'),getCookie('password'))

            }else if(value.isLogStored == 0){
                if(accountData===undefined){
                    setIsLog(false)
                    console.log('tt')
                }else{
                    setAccountData(undefined)
                    console.log('ss')
                    setIsLog(false)
                }
                
            }

    })

    useEffect(() => {
        if(currentProfile.MiSeguono != undefined){
            setCurrFollowerCount(currentProfile.MiSeguono.length-1)
        }else{
            setCurrFollowerCount(0)
        }
    }, [currentProfile])

    //load userpage
    useEffect(() => {
        setTiSegue(false)
        setAccountData(undefined)
        setLoading(true)
        fetch('/api/findUser/' + utenteId)
            .then((res) => res.json())
            .then((data1) => {
                setCurrentProfile(data1[0])
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                
            })
        
    }, [utenteId])

    

    const follow = async () =>{
        const res = await fetch('/api/follow/'+accountData[0].Email+'/'+accountData[0].Password+'/'+utenteId);
        let oldFollowerCount = currFollowerCount
        setCurrFollowerCount(oldFollowerCount+1)
        setOverride('1')
        return (await res.json())
    }
    const unfollow = async () =>{
        const res = await fetch('/api/unfollow/'+accountData[0].Email+'/'+accountData[0].Password+'/'+utenteId);
        let oldFollowerCount = currFollowerCount
        setCurrFollowerCount(oldFollowerCount-1)
        setOverride('2')
        return (await res.json())
    }

    
    return (
        <div ref={animationParent}>
            <Head>

                <title>AnimeCrowd Profilo di {currentProfile.NomeUtente}</title>
                <meta property="og:image" content={currentProfile.Avatar}></meta>
                <meta name="description" content={"Profilo di" + currentProfile.NomeUtente + "su AnimeCrowd"} />
                <meta name="author" content="AnimeCrowd Staff"></meta>
                <meta name="msapplication-TileColor" content="#000000"></meta>
                <meta name="theme-color" content="#000000"></meta>
                <meta name="robots" content="noindex, nofollow" />

                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,700,1,200" />
            </Head>

            <br></br>

            {isLoading == true ?
                <Loading/>
            : 
                <>
            
                    {currentProfile == "nessun risultato" ? <h1>Utente non trovato</h1> : null}
                        
                        
                    <div style={{backgroundClip: 'content-box', padding: '1px', width: '100%', position: 'relative', marginTop: '-20px', zIndex: '-1'}}>
                        <img className="imagebann" alt={'Banner di '+ currentProfile.NomeUtente} src={currentProfile.Sfondo == '' || currentProfile.Sfondo == undefined ? 'https://www.ammotor.it/wp-content/uploads/2017/12/default_image_01-1024x1024-570x321.png' : 'https://i.imgur.com/'+currentProfile.Sfondo+'.jpg'} style={{opacity: .5, objectFit: 'cover', width: '100%', height: '50vh', position: 'relative', zIndex: '100'}}/> 
                        <div variant="contained" className="videoHome"></div>
                                    <style>
                                        {`
                                            input[type="text"]
                                            {
                                                font-family: Work Sans, sans-serif;
                                                font-size:30px;
                                                font-weight: 900!important;
                                            }
                                            .MuiInputLabel-animated
                                            {
                                                font-family: Work Sans, sans-serif;
                                                font-size:30px;
                                                font-weight: 900!important;
                                            }
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
                                sx={{ width: 200, borderRadius: '500px', }}
                                style={{objectFit: 'cover', height: '200px'}}
                                image={currentProfile.Avatar!=undefined ?'https://i.imgur.com/'+currentProfile.Avatar.replace('https://i.imgur.com/','').replace('.jpg','')+'.jpg':null}
                                alt={'Foto profilo di '+ currentProfile.NomeUtente}
                            />
                            
                            
                            <h1 style={{fontFamily: 'Work Sans, sans-serif', textTransform: 'uppercase', fontWeight: 'extrabold'}}><strong>{currentProfile.NomeUtente}</strong></h1>

            
                            <br></br>

                                <table style={{width: '100%', textAlign: 'center', tableLayout: 'fixed', opacity: '0.5'}}>
                                    <tbody>
                                        <tr>
                                            <th>FOLLOWING</th>
                                            <th>FOLLOWER</th>
                                        </tr>
                                        <tr>
                                            <td>{currentProfile.Amici!=undefined ? JSON.stringify(currentProfile.Amici.length-1):null}</td>
                                            <td>{currFollowerCount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br></br>
                                <br></br>

                                
                                {isLog?
                                    accountData[0]._id != currentProfile._id? 
                                        override=='0' ? 
                                            !utenteSeguito?
                                                <Button onClick={follow} color={'success'} className="btnPlayCopertina" variant="contained" style={{width: '100%', borderRadius: '15px', }}>
                                                    <PersonAddIcon sx={{ color: 'black', fontSize: 27 }}/><strong>&nbsp;FOLLOW {tiSegue? '- TI SEGUE' : '- NON TI SEGUE'}</strong>
                                                </Button>
                                            :
                                                <Button onClick={unfollow} color={'error'} className="btnPlayCopertina" variant="contained" style={{width: '100%', borderRadius: '15px', }}>
                                                    <PersonAddDisabledIcon sx={{ color: 'black', fontSize: 27 }}/><strong>&nbsp;UNFOLLOW {tiSegue? '- TI SEGUE' : '- NON TI SEGUE'}</strong>
                                                </Button>
                                        :
                                            override=='2'?
                                                <Button onClick={follow} color={'success'} className="btnPlayCopertina" variant="contained" style={{width: '100%', borderRadius: '15px', }}>
                                                    <PersonAddIcon sx={{ color: 'black', fontSize: 27 }}/><strong>&nbsp;FOLLOW {tiSegue? '- TI SEGUE' : '- NON TI SEGUE'}</strong>
                                                </Button>
                                            :
                                                <Button onClick={unfollow} color={'error'} className="btnPlayCopertina" variant="contained" style={{width: '100%', borderRadius: '15px', }}>
                                                    <PersonAddDisabledIcon sx={{ color: 'black', fontSize: 27 }}/><strong>&nbsp;UNFOLLOW {tiSegue? '- TI SEGUE' : '- NON TI SEGUE'}</strong>
                                                </Button>

                                    
                                    : null
                                    

                                : 

                                    <Button onClick={() => document.getElementById("buttAccountNav").click()} sx={{backgroundColor: 'white'}} className="btnPlayCopertina" variant="contained" style={{width: '100%', borderRadius: '15px', }}>
                                        <LoginIcon sx={{ color: 'black', fontSize: 27 }}/><strong>&nbsp;ACCEDI PER SEGUIRE</strong>
                                    </Button>
                                }

                                <br></br>
                                <br></br>
                                

                                <center>
                                <ScrollContainer  style={{webkitUserSelect: 'none', msUserSelect: 'none', userSelect: 'none', marginLeft: '-10%', marginRight: '-10%', boxShadow: 'rgb(0 0 0) -20px 0px 0px 20px, rgb(0 0 0) 20px 0px 0px 20px, inset 30px 0px 20px 0px #000000, inset -30px 0px 20px 0px #000000', display: 'inline-flex', maxWidth: '-webkit-fill-available', overflowX: 'scroll', cursor: '-webkit-grab'}}>
                                    
                                    <h1>&nbsp;</h1>
                                    {
                                        currentProfile.Badge&&currentProfile.Badge[0].dev?
                                            <img height={100} src="/badge/DEVbadge.png" style={{zIndex: '-1'}}/>
                                        :
                                            null
                                    }
                                    {
                                        currentProfile.Badge&&currentProfile.Badge[0].first?
                                            <img height={100} src="/badge/FIRSTbadge.png" style={{zIndex: '-1'}}/>
                                        :
                                            null
                                    }
                                    {
                                        currentProfile.Badge&&currentProfile.Badge[0].second?
                                            <img height={100} src="/badge/SECONDbadge.png" style={{zIndex: '-1'}}/>
                                        :
                                            null
                                    }
                                    {
                                        currentProfile.Badge&&currentProfile.Badge[0].third?
                                            <img height={100} src="/badge/THIRDbadge.png" style={{zIndex: '-1'}}/>
                                        :
                                            null
                                    }
                                    {
                                        currentProfile.DataAccount.split('-')[0] == '2022' && currentProfile.DataAccount.split('-')[1] < 12?
                                            <img height={100} src="/badge/V1badge.png" style={{zIndex: '-1'}}/>
                                        :
                                            null
                                    }
                                    
                                    
                                    
                                    
                                    
                                    <h1>&nbsp;</h1>

                                </ScrollContainer >
                                </center>

                                <br></br>

                                {isLog?
                                    accountData[0]._id != currentProfile._id?
                                        <>  
                                            {/*LISTA*/}
                                            <>
                                                <strong><h1 style={{fontFamily: 'Work Sans, sans-serif'}}><a style={{color: 'rgb(220 135 255)', textShadow: 'rgba(220, 135, 255, 0.3) 0px 0px 20px',}}>CROWD</a>LIST  DI {currentProfile.NomeUtente}</h1></strong>

                                                    {
                                                        currentProfile.Lista && currentProfile.Lista.length!=0?
                                                        <>
                                                            {
                                                                animeDaContinuare.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><RemoveRedEyeIcon/> IN CORSO</h1></strong>
                                                                    {animeDaContinuare.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            {
                                                                animeDaGuardare.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><BookmarkAddRoundedIcon/> DA GUARDARE</h1></strong>
                                                                    {animeDaGuardare.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            {
                                                                animeCompletati.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><CheckIcon/> COMPLETATI</h1></strong>
                                                                    {animeCompletati.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            {
                                                                animeDroppati.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><VisibilityOffIcon/> DROPPATI</h1></strong>
                                                                    {animeDroppati.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            
                                                        </>

                                                        :
                                                            <h5>{currentProfile.NomeUtente} NON HA ANCORA AGGIUNTO NIENTE ALLA SUA CROWDLIST</h5>
                                                    }
                                        
                                            </>

                                            <br></br>
                                            <br></br>
                                            <br></br>

                                            {/*PREFERITI*/}
                                            <>
                                                <strong><h1 style={{fontFamily: 'Work Sans, sans-serif'}}><FavoriteRoundedIcon/> PREFERITI</h1></strong>
                                                <br></br>

                                                    {
                                                        currentProfile.Preferiti && currentProfile.Preferiti.length!=0?
                                                        <>
                                                            {
                                                                animePreferiti.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}>IN CORSO</h1></strong>
                                                                    {animePreferiti.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            
                                                            
                                                        </>

                                                        :
                                                            <h5>{currentProfile.NomeUtente} NON HA ANCORA AGGIUNTO NIENTE AI PREFERITI</h5>
                                                    }
                                            </>
                                            
                                        </>
                                    : 
                                        <>
                                            {/*TUA LISTA*/}
                                            <>
                                                <strong><h1 style={{fontFamily: 'Work Sans, sans-serif'}}>LA TUA <a style={{color: 'rgb(220 135 255)', textShadow: 'rgba(220, 135, 255, 0.3) 0px 0px 20px',}}>CROWD</a>LIST</h1></strong>
                                                
                                                {
                                                    currentProfile.Lista && currentProfile.Lista.length!=0?
                                                        <>
                                                            {
                                                                animeDaContinuare.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><RemoveRedEyeIcon/> IN CORSO</h1></strong>
                                                                    {animeDaContinuare.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            {
                                                                animeDaGuardare.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><BookmarkAddRoundedIcon/> DA GUARDARE</h1></strong>
                                                                    {animeDaGuardare.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            {
                                                                animeCompletati.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><CheckIcon/> COMPLETATI</h1></strong>
                                                                    {animeCompletati.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            {
                                                                animeDroppati.length!=0?
                                                                <>
                                                                    <strong><h1 style={{textAlign: 'left', fontFamily: 'Work Sans, sans-serif'}}><VisibilityOffIcon/> DROPPATI</h1></strong>
                                                                    {animeDroppati.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            
                                                        </>

                                                    :
                                                        <h5>NON HAI ANCORA AGGIUNTO NIENTE ALLA SUA CROWDLIST</h5>
                                                }
                                            </>
                                            
                                            <br></br>
                                            <br></br>
                                            <br></br>

                                            {/*TUOI PREFERITI*/}
                                            <>
                                                <strong><h1 style={{fontFamily: 'Work Sans, sans-serif'}}><FavoriteRoundedIcon/> I TUOI PREFERITI</h1></strong>
                                                <br></br>

                                                    {
                                                        currentProfile.Preferiti && currentProfile.Preferiti.length!=0?
                                                        <>
                                                            {
                                                                animePreferiti.length!=0?
                                                                <>
                                                                    {animePreferiti.map((_, index) => (
                                                                        <Grid item key={index} style={{maxWidth: '400px'}}>
                                                                            <CardComponent EPISODE={false} Nome={_.Nome} Uscita={_.Uscita} Stato={_.Stato} Copertina={_.Copertina} Id={_._id} Trama={_.Trama} Generi={_.Generi}/>
                                                                        </Grid>
                                                                    ))}
                                                                </>
                                                                :null
                                                            }
                                                            
                                                            
                                                        </>

                                                        :
                                                            <h5>NON HAI ANCORA AGGIUNTO NIENTE AI PREFERITI</h5>
                                                    }
                                            </>

                                            <br></br>
                                        </>
                                :
                                    <h5>DEVI ESSERE LOGGATO PER VEDERE LE CROWDLIST E I PREFERITI</h5>
                                }
                                
                                

                        </center>

                        <br></br>
                        <br></br>

                    </Container>

                </>
            }

            <script async="async" data-cfasync="false" src="//pl17727417.highperformancecpmgate.com/65b96abcfdde95022fd25ce3998d9433/invoke.js"></script>
            <div id="container-65b96abcfdde95022fd25ce3998d9433"></div>
        </div>
    )
}

export default UtentePage