import React, { useRef, useState, useEffect } from "react";
import Head from 'next/head'
import { useRouter } from 'next/router'

import Loading from '/components/Loading'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import LoginIcon from '@mui/icons-material/Login';

import {UserContext} from '../_app'

function UtentePage() {
    const value = React.useContext(UserContext);  

    const [animationParent] = useAutoAnimate()
    const router = useRouter()
    const { utenteId } = router.query

    const [currentProfile, setCurrentProfile] = useState([{Tag: 'o_id', NomeUtente: 'result[0].NomeUtente', Avatar: 'result[0].Avatar', DataAccount: 'result[0].DataAccount', Amici: [{}], MiSeguono: [{}], AnimeVisti: [{}], Badge: ''}])
    const [currFollowerCount, setCurrFollowerCount] = useState(0)

    const [isLoading, setLoading] = useState(true)

    const [isLog, setIsLog] = useState(false);
    const [accountData, setAccountData] = useState(undefined);

    const [utenteSeguito, setUtenteSeguito] = useState(false);
    const [override, setOverride] = useState('0');
    const [tiSegue, setTiSegue] = useState(false);



    async function LogIn(emailPROPS, passwordPROPS) {
        const res = await fetch('/api/logIn/'+emailPROPS+'/'+passwordPROPS);
        return (
            setAccountData(await res.json())
            
        )
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

                console.log( 's>>>>>' + JSON.stringify(accountData[0]))

            }else if(accountData){

                accountData[0].Amici.map(item => {
                    if(item._id == currentProfile.Tag){
                        setUtenteSeguito(true)
                    }else{
                        setUtenteSeguito(false)
                    }
                })
                currentProfile.Amici.map(item => {
                    if(item._id!=undefined){
                        if(item._id == accountData[0]._id){
                            setTiSegue(true)
                        }
                    }
                })

                setTimeout(() => {
                    setIsLog(true)
                },500)

            }
        }, 1000)
    })

    
    useEffect(() => {
            console.log('<<<<' + value.isLogStored)
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
                                    accountData[0]._id != currentProfile.Tag? 
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
                                
                                
                                

                        </center>

                        <br></br>
                        <br></br>

                    </Container>

                </>
            }

            <script async="async" data-cfasync="false" src="//pl17984878.highperformancecpmgate.com/1b6373ad4b2983db25160080ceb42139/invoke.js"></script>
            <div id="container-1b6373ad4b2983db25160080ceb42139"></div>
        </div>
    )
}

export default UtentePage