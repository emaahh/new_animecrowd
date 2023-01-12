import React, { useRef, useState, useEffect } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import Avatar from '@mui/material/Avatar';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {UserContext} from '../pages/_app'
import SelectTagComponent from './SelectTagComponent'


export default function NavBar() {
    const value = React.useContext(UserContext);  
    const router = useRouter();
    const [animationParent] = useAutoAnimate()

    const searchInput = useRef(null)
    const [isSearching, setIsSearching] = useState(false)
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const [state, setState] = useState({right: false});
    const [state2, setState2] = useState({Altro:false});

    const [logPage, setLogPage] = useState(0);
    const [isLog, setIsLog] = useState(false);
    const [accountData, setAccountData] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentName, setCurrentName] = useState(false);
    const [responceRegister, setResponceRegister] = useState([]);

    const [errLog, setErrLog] = useState(false);

    const [currentPic, setCurrentPic] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(false);

    function changePic(e){
        setCurrentPic(e.target.files[0])
        fetch("https://api.imgur.com/3/image",{
            method: "POST",
            headers: {
                Authorization: "Client-ID b48fc4b39f05b42"
            },
            body: e.target.files[0]
        }).then(data => data.json()).then(data => {
            fetch("/api/editProfilePic/"+ getCookie('email') + '/' + getCookie('password') + '/'+ data.data.link.replace('https://i.imgur.com/', '').replace('.jpg', '').replace('.png', ''))
        })
    }
    function changeBanner(e){
        setCurrentBanner(e.target.files[0])
        fetch("https://api.imgur.com/3/image",{
            method: "POST",
            headers: {
                Authorization: "Client-ID b48fc4b39f05b42"
            },
            body: e.target.files[0]
        }).then(data => data.json()).then(data => {
            fetch("/api/editBanner/"+ getCookie('email') + '/' + getCookie('password') + '/'+ data.data.link.replace('https://i.imgur.com/', '').replace('.jpg', '').replace('.png', ''))
        })
    }


    function checkIfEmail(str) {
        // Regular expression to check if string is email
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      
        return regexExp.test(str);
    }
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
    
        setState({ ...state, [anchor]: open });
        setIsSearching(false);
        setSearchResult([])
        setUserName('')
        setEmail('')
        setPassword('')
        setErrLog(false)
        setResponceRegister([])
        value.openProfileSetting(open)
    };
    const toggleDrawer2 = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState2({ ...state2, [anchor]: open });
        setIsSearching(false);
        setSearchResult([])
        setUserName('')
        setEmail('')
        setPassword('')
        setErrLog(false)
        setResponceRegister([])
    };

    function handleChangeInput(event) {
        setQuery(event.target.value)
    }

    function handleChangeUserName(event) {
        setUserName(event.target.value)
    }
    function handleChangeEmail(event) {
        if(checkIfEmail(event.target.value)){
            setEmail(event.target.value)
        }else{
            setEmail('')
        }
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }

    function LogIn(emailPROPS, passwordPROPS) {
        fetch('/api/logIn/'+emailPROPS+'/'+passwordPROPS)
        .then(data => data.json()).then(data => {
            if(JSON.stringify(data) == '[]'){
                setErrLog(true)
            }else{
                setAccountData(data)
                setState({ ...state, ['right']: false });
                setIsLog(true)
            }
            
        })
    }

    //check credenziali
    useEffect(() => {
        if(accountData!=[]&&accountData!=''){
            setIsLog(true)
            value.saveLog(1)
            if(!hasCookie('email') && !hasCookie('password')){
                setCookie('email', email, {maxAge:new Date().getTime() + (24*60*60*60*1000)});
                setCookie('password', password, {maxAge:new Date().getTime() + (24*60*60*60*1000)});
                /*const thispath = router.asPath
                router.push('/')
                setTimeout(() => {
                    router.push(thispath)
                }, 1000)*/
            }
        }
    }, [accountData])

    //auto login
    useEffect(() => {
        if(hasCookie('email') && hasCookie('password')){
            LogIn(getCookie('email'),getCookie('password'))
        }
    }, [])

    async function Register(userNamePROPS, emailPROPS, passwordPROPS) {
        const res = await fetch('/api/register/'+userNamePROPS+'/'+emailPROPS+'/'+passwordPROPS);
        return (setResponceRegister(await res.text()))
    }
    useEffect(() => {
        if(responceRegister == 'utente già registato'){
            
        }else{
            LogIn(email,password)
        }
    }, [responceRegister])

    //logout
    function logOut(){
        router.push('/')
        setErrLog(false)
        setAccountData('')
        setIsLog(false)
        setUserName('')
        setEmail('')
        setPassword('')
        deleteCookie('email');
        deleteCookie('password');
        setState({ ...state, ['right']: false });

        value.saveLog(0)

        /*const thispath = router.asPath
        console.log(thispath)
        router.push('/')
        setTimeout(() => {
            router.push(thispath)
        }, 1000)
        */
    }

    //serch
    useEffect(() => {
        const coolDown = setTimeout(() => {
            if(query.trim().length >= 3){
                fetch('/api/searchAnimeUser/'+ query)
                    .then((res) => res.json())
                    .then((data) => {
                        setSearchResult(data)
                    })
            }else{
                setSearchResult([])
            }
        }, 500)
        return () => {
            clearTimeout(coolDown)
        }
    }, [query])

    //focus on serch box
    //block scroll
    useEffect(() => {
        if(searchInput.current != null){
            searchInput.current.focus()
            document.getElementsByClassName("searchInput")[0].focus()
        }
        if(isSearching){
            document.getElementsByTagName("body")[0].style.overflowY = "hidden"
            document.getElementById("navbar").style.backdropFilter = "none"
        }else{
            document.getElementsByTagName("body")[0].style.overflowY = "scroll"
        }
    }, [isSearching])
    

    const openSearch = () => {
        /*
        console.log(state.right, state2.Altro)
        if(state.right == false && state2.Altro == false){
            setIsSearching(current => !current);
            setSearchResult([])
        }*/
        setState({ ...state, ['right']: false });
        setState2({ ...state2, ['Altro']: false });
        setIsSearching(current => !current);
        setSearchResult([])
       
    }

    async function changeName(params) {
        const res = await fetch('/api/editName/'+getCookie('email')+'/'+getCookie('password')+'/'+params);
        return (setResponceRegister(await res.text()), setCurrentName(params), document.getElementById('input-with-sx').value = '')
    }

    //open profile panel
    useEffect(() => {
        if(value.impProfilo == true && state.right == false){
            setState({ ...state, ['right']: true });
        }
    },[value.impProfilo])

    return (
        <span id="navbar" ref={animationParent} style={{zIndex: '999999999999999999', position: 'fixed', width: '100%'}}>
            <Container maxWidth="xxl">
                <nav style={{display: 'flex', justifyContent: 'space-between', zIndex: '99999999999999999918'}}>
                    <div>
                        <Link href="/" passHref legacyBehavior>
                            <h1 style={{fontFamily: 'Work Sans, sans-serif', cursor: 'pointer', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px',}}>ANIME<a style={{color: 'rgb(220 135 255)', textShadow: 'rgba(220, 135, 255, 0.8) 0px 0px 20px',}}>CROWD</a></h1>
                        </Link>
                    </div>
                    
                    
                    <div id="serchIco" style={{display: 'flex'}}>

                        <button onClick={openSearch} style={{cursor: 'pointer', backgroundColor: 'transparent', borderColor: 'transparent', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px'}}><SearchRoundedIcon class="ICOW" sx={{ color: 'white', fontSize: 24 }}/></button>
                        
                        <button id="buttAccountNav" onClick={isLog ? ()=>router.push('/utente/'+accountData[0]._id) : toggleDrawer('right', !state.right)} style={{cursor: 'pointer', backgroundColor: 'transparent', borderColor: 'transparent', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px'}}>{!isLog ? <NoAccountsIcon class="ICOW" sx={{ color: 'white', fontSize: 24 }}/> : <Avatar alt="Avatar"sx={{ width: 26, height: 26 }} src={currentPic? URL.createObjectURL(currentPic) : 'https://i.imgur.com/'+accountData[0].Avatar.replace('https://i.imgur.com/','').replace('.jpg','')+'b.jpg'} />}</button>
                        
                        <button id="altroo" onClick={toggleDrawer2('Altro', !state2.Altro)} style={{padding: '0px', cursor: 'pointer', backgroundColor: 'transparent', borderColor: 'transparent', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px'}}><MoreVertRoundedIcon class="ICOW" sx={{ color: 'white', fontSize: 24 }}/></button>
                        
                    </div>
                </nav>
            </Container>

            {isSearching && ( 
                <>
                    <div className="blur" style={{position: 'fixed', marginTop: '-80px', height: '120vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: '-1'}}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', justifyContent: 'center',zIndex: '1'}}>

                        <Container style={{}} maxWidth="sm">
                            <div style={{display: 'flex'}}>
                                <Fab variant="extended" sx={{width: '100%', backgroundColor: '#ffffff!important', marginRight: '5px'}} className="searchInputWrapper">
                                    <input className="searchInput" placeHolder="Cerca anime o utenti" ref={searchInput} onChange={handleChangeInput} style={{
                                            backgroundColor: '#ffffff',
                                            border: 'none',
                                            width: '100%', height: '90%',
                                            color: 'black', fontFamily: 'Work Sans, sans-serif',
                                            fontSize: '15px',
                                    }}/>
                                    <style>
                                        {`
                                            .searchInput:focus {
                                                    outline: none;
                                                }
                                            }
                                            .searchInputWrapper{
                                                backgroundColor: '#ffffff!important',
                                            }
                                            .searchInputWrapper:hover{
                                                backgroundColor: '#ffffff',
                                            }
                                            .blur::before{
                                                backdrop-filter: blur(40px);
                                                -webkit-backdrop-filter: blur(40px);
                                            }
                                            .blur {
                                                backdrop-filter: blur(50px);
                                                -webkit-backdrop-filter: blur(40px);
                                            }
                                            .css-8je8zh-MuiTouchRipple-root {
                                                visibility: hidden;
                                            }
                                        `}
                                    </style>
                                </Fab>
                                <Fab variant="extended" onClick={openSearch} style={{backgroundColor: '#ffffff!important'}}>
                                    <CloseRoundedIcon/>
                                </Fab>
                            </div>

                            

                            <br></br>

                            <div style={{border: '5px solid white', padding: '10px', backgroundColor: '#ffffff', width: '100%', height: '100%', borderRadius: '15px', maxHeight: '50vh', overflowY: 'scroll'}}>

                                {searchResult.length == 0 ? 
                                    <center>
                                        <p style={{fontSize: '10px', color: 'rgba(0,0,0,0.5)'}}>Digita almeno 3 caratteri o cambia parola chiave</p>

                                        <a href={'https://t.me/AnimeCrowd'} target="_blank" rel="noreferrer">
                                            <Fab sx={{height: '30px', backgroundColor: 'rgb(51, 168, 217)', fontSize: '10px'}} variant="extended">
                                                <strong>NON TROVI QUELLO CHE CERCHI? SCRIVICI!</strong>
                                            </Fab>
                                        </a>
                                        
                                    </center> 
                                : 
                                    
                                    searchResult.map((_, index) => (
                                        _.NomeUtente==undefined ?
                                            <Link href={'/anime/'+ _._id} passHref onClick={openSearch} key={_.id}>
                                                <div style={{backgroundColor: 'rgba(0,0,0)', padding: '15px', margin: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center'}}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 'auto', borderRadius: '10px', }}
                                                        style={{objectFit: 'cover', height: '70px', marginRight: '10px'}}
                                                        image={_.Copertina}
                                                        alt={'Copertina di ' + _.Nome}
                                                    />
                                                    <div>
                                                        <h4 style={{marginBottom: '0px'}}>{_.Nome}</h4>
                                                        <p style={{fontSize: '9px', color: 'rgba(255,255,255,0.5)'}}><strong>STATO:</strong> {_.Stato} <strong>USCITA:</strong> {_.Uscita}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            :

                                            <Link href={'/utente/'+ _._id} passHref onClick={openSearch} key={_.id}>
                                                <div style={{backgroundColor: 'rgba(0,0,0)', padding: '15px', margin: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center'}}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 'auto', borderRadius: '50px', }}
                                                        style={{objectFit: 'cover', height: '70px', marginRight: '10px'}}
                                                        image={_.Avatar!=undefined ?'https://i.imgur.com/'+_.Avatar.replace('https://i.imgur.com/','').replace('.jpg','')+'b.jpg':null}
                                                        alt={'Foto profilo di ' + _.NomeUtente}
                                                    />
                                                    <div>
                                                        <h4 style={{marginBottom: '0px'}}>{_.NomeUtente}</h4>
                                                        <p style={{fontSize: '9px', color: 'rgba(255,255,255,0.5)'}}><strong>FOLLOWING:</strong> {JSON.stringify(_.Amici.length-1)} <strong>FOLLOWER:</strong> {_.MiSeguono!=undefined ? JSON.stringify(_.MiSeguono.length-1): '0'}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        
                                        
                                    ))
                                
                                }
                                

                            </div>

                        </Container>
                    </div>
                </>
            )}

                                
            {!isLog ?
                //non è loggato
                <SwipeableDrawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)} onOpen={toggleDrawer('right', true)}  ref={animationParent}>
                    <Container style={{padding: '50px'}} maxWidth="sm"  ref={animationParent}>
                        <br></br>
                        <br></br>
                        <center  ref={animationParent}>
                            
                            <h1>Benvenuto!</h1>
                            
                            <div ref={animationParent}>
                                {logPage == 0 ? 
                                    <div className="accedi" ref={animationParent}>
                                        <h3>Accedi!</h3>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Email" variant="standard" onChange={handleChangeEmail} type={'email'}/>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <VpnKeyRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Password" variant="standard" onChange={handleChangePassword} type={'password'}/>
                                        </Box>

                                        <br></br>
                                        {!errLog? null:<h3>Credenziali errate</h3>}
                                        <Fab variant="extended" color={email!=''&&password!='' ? "success" : "error"} onClick={()=> email!=''&&password!='' ? LogIn(email,password) : null}>
                                            <strong>ENTRA</strong>
                                        </Fab>

                                        <br></br>
                                        <br></br>

                                        <center>
                                            <a href={'https://t.me/AnimeCrowd'} target="_blank" rel="noreferrer">
                                                <Fab sx={{height: '30px', backgroundColor: 'rgb(51, 168, 217)'}} variant="extended">
                                                    <strong>PROBLEMI? SCRIVICI!</strong>
                                                </Fab>
                                            </a>
                                        </center>

                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                        <Fab variant="extended" onClick={() => setLogPage(1)}>
                                            <strong>Non ho un account</strong>
                                        </Fab>
                                    </div>

                                    : 

                                    <div className="registrati" ref={animationParent}>
                                        <h3>Registrati!</h3>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Nome utente" variant="standard" onChange={handleChangeUserName} inputProps={{ maxLength: 11 }} type={'text'}/>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Email" variant="standard" onChange={handleChangeEmail} type={'email'}/>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <VpnKeyRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Password" variant="standard" onChange={handleChangePassword} inputProps={{ maxLength: 11 }} type={'password'}/>
                                        </Box>

                                        <br></br>
                                        {responceRegister != 'utente già registato' ? null:<h3>Email già registrata</h3>}
                                        <Fab variant="extended" color={userName!=''&&email!=''&&password!='' ? "success" : "error"} onClick={()=> userName!=''&&email!=''&&password!='' ? Register(userName,email,password) : null}>
                                            <strong>ENTRA</strong>
                                        </Fab>
                                        
                                        <br></br>
                                        <br></br>
                                        
                                        <center>
                                            <a href={'https://t.me/AnimeCrowd'} target="_blank" rel="noreferrer">
                                                <Fab sx={{height: '30px', backgroundColor: 'rgb(51, 168, 217)'}} variant="extended">
                                                    <strong>PROBLEMI? SCRIVICI!</strong>
                                                </Fab>
                                            </a>
                                        </center>

                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                        <Fab variant="extended" onClick={() => setLogPage(0)}>
                                            <strong>Ho un account</strong>
                                        </Fab>
                                    </div>
                            
                                }
                            </div>
                            
                        </center>
                        <br></br>
                        <br></br>
                        <Fab variant="extended" onClick={toggleDrawer('right', false)} sx={{ left: '50%', width: '50px', position: 'sticky', transform: 'translate(-50%, 0%)', bottom: '20px',}}>
                            <CloseRoundedIcon sx={{fontSize: '30px'}}/>
                        </Fab>
                    </Container>
                </SwipeableDrawer>
                : 
                //è loggato
                <SwipeableDrawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)} onOpen={toggleDrawer('right', true)}  ref={animationParent}>
                        <center  ref={animationParent}>


                            <div style={{backgroundClip: 'content-box', padding: '1px', width: '100%', position: 'relative', marginTop: '-20px', zIndex: '-1'}}>
                                <img className="imagebann" alt={'Banner di '+ accountData[0].NomeUtente} src={currentBanner ? URL.createObjectURL(currentBanner) : accountData[0].Sfondo == '' || accountData[0].Sfondo == undefined ? 'https://www.ammotor.it/wp-content/uploads/2017/12/default_image_01-1024x1024-570x321.png' : 'https://i.imgur.com/'+accountData[0].Sfondo+'.jpg'} style={{opacity: .8, objectFit: 'cover', width: '100%', height: '50vh', position: 'relative', zIndex: '100'}}/> 
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
                                            -webkit-mask-image: linear-gradient(transparent, black 50%, transparent);
                                            mask-image: linear-gradient (transparent, black 50%, transparent);
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
                                        image={currentPic? URL.createObjectURL(currentPic) : accountData[0].Avatar!=undefined ?'https://i.imgur.com/'+accountData[0].Avatar.replace('https://i.imgur.com/','').replace('.jpg','')+'.jpg':null}
                                        alt={'Foto profilo di '+ accountData[0].NomeUtente}
                                    />

                                    <br></br>

                                    <center>
                                            <a href={'https://t.me/AnimeCrowd'} target="_blank" rel="noreferrer">
                                                <Fab sx={{height: '30px', backgroundColor: 'rgb(51, 168, 217)'}} variant="extended">
                                                    <strong>PROBLEMI? SCRIVICI!</strong>
                                                </Fab>
                                            </a>
                                    </center>

                                    <br></br>                              
                                    
                                    <Container maxWidth="sm" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',}}> 
                                        <Fab sx={{ml: 1, height: '40px', marginBottom: '10px'}} variant="extended">
                                            <label for="imgprofiloinput"><strong>Modifica foto profilo</strong></label>
                                        </Fab>
                                        
                                        <Fab sx={{ml: 1, height: '40px'}} variant="extended">
                                            <label for="imgbannerinput"><strong>Modifica banner</strong></label>
                                        </Fab>

                                        <input id="imgprofiloinput" type="file" accept="image/*" onChange={changePic} style={{visibility: 'hidden', display: 'none',}}/>
                                        <input id="imgbannerinput" type="file" accept="image/*" onChange={changeBanner} style={{visibility: 'hidden', display: 'none',}}/>
                                    </Container>

                                    <Box sx={{maxWidth: '350px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} >
                                        
                                        <TextField className="newusernametext" style={{textTransform: 'uppercase'}} id="input-with-sx" onChange={handleChangeUserName}  label={currentName ? currentName : accountData[0].NomeUtente} variant="standard" inputProps={{ maxLength: 11 }} type={'text'}/>
                                        <EditIcon sx={{fontSize: '30px', marginBottom: '5px'}}/>&nbsp;&nbsp;
                                        <div>
                                            {userName!='' ?

                                                <Fab sx={{ml: 1, height: '40px'}} variant="extended" color={userName!='' ? "success" : "error"} onClick={()=> userName!='' ? changeName(userName) : null}>
                                                    <strong>SALVA</strong>
                                                </Fab>

                                                :null
                                            } 
                                        </div> 
                                    </Box>
                    
                                    <br></br>
                                    <br></br>
                                    <br></br>


                                    <Fab variant="extended" color={'warning'} onClick={() => logOut()}>
                                        <LogoutRoundedIcon/>
                                        &nbsp;
                                        <strong>LOGOUT</strong>
                                    </Fab>

                                    <br></br>
                                    <br></br>
                                    <br></br>


                                </center>


                            </Container>
                            <br></br>
                            <br></br>
                            <Fab variant="extended" onClick={toggleDrawer('right', false)} sx={{ left: '50%', width: '50px', position: 'sticky', transform: 'translate(-50%, 0%)', bottom: '20px',}}>
                                <CloseRoundedIcon sx={{fontSize: '30px'}}/>
                            </Fab>
                        </center>
                    
                </SwipeableDrawer>
            }

            {/*ALTRO*/}
            <SwipeableDrawer anchor={'right'} open={state2['Altro']} onClose={toggleDrawer2('Altro', false)} onOpen={toggleDrawer2('Altro', true)}  ref={animationParent}>
                <Container style={{paddingTop: '50px'}} maxWidth="sm"  ref={animationParent}>

                    <br></br>
                    <br></br>

                    <center  ref={animationParent}>
                        {/*RICERCA FILTRI*/}
                        <Accordion style={{borderRadius: '15px', backdropFilter: 'blur(50px)', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>🎚️ RICERCA CON FILTRI</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{textAlign: 'start'}}>

                                    <SelectTagComponent/>

                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <br></br>
                        
                        {/*AGGIORNAMENTI*/}
                        <Accordion style={{borderRadius: '15px', backdropFilter: 'blur(50px)', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>🔔 AGGIORNAMENTI</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                 {/*VERSIONE 2.3*/}
                                 <Accordion style={{borderRadius: '15px', backdropFilter: 'blur(50px)', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography>VERSIONE 2.3</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography style={{textAlign: 'start'}}>
                                            🔘 Introdotta sezione <strong>i più votati</strong> disponibile nella home
                                            <br></br>
                                            🔘 Migliorate le sezioni della <strong>home</strong> su mobile
                                            <br></br>
                                            🔘 Diverse migliorate grafiche tra cui il raggruppmento nella <strong>home</strong> della sezione <strong>in corso</strong>
                                            <br></br>
                                            🔘 Tempo di caricamento della pagina degli anime <strong>ridotto</strong>
                                            <br></br>
                                            🔘 Bug fix generale
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <br></br>
                                {/*VERSIONE 2.2*/}
                                <Accordion style={{borderRadius: '15px', backdropFilter: 'blur(50px)', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography>VERSIONE 2.2</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography style={{textAlign: 'start'}}>
                                            🔘 Reinserita la funzione <strong>ricerca con filtri</strong>, disponibile nel menù <strong>altro</strong>
                                            <br></br>
                                            🔘 Bug fix generale
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <br></br>
                                {/*VERSIONE 2.1*/}
                                <Accordion style={{borderRadius: '15px', backdropFilter: 'blur(50px)', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography>VERSIONE 2.1</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography style={{textAlign: 'start'}}>
                                            🔘 La sezione <strong>modifica profilo</strong> adesso si trova nella <strong>pagina del tuo profilo</strong>
                                            <br></br>
                                            🔘 La foto profilo accanto la ricerca in alto porterà alla <strong>pagina del tuo profilo</strong>
                                            <br></br>
                                            🔘 I tasti degli anime nella home non mostrano più un&apos;anteprima ma portano direttamente alla <strong>pagina dell&apos;anime</strong>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionDetails>
                        </Accordion>
                        
                        <br></br>
                        
                        <Accordion style={{borderRadius: '15px', backdropFilter: 'blur(50px)', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>❤️ Supportaci</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <iframe id='kofiframe' src='https://ko-fi.com/animecrowd/?hidefeed=true&widget=true&embed=true' style={{borderRadius: '15px', border:'none', width:'100%', padding:'4px', background:'#f9f9f9'}} height='712' title='animecrowd'></iframe>
                            </AccordionDetails>
                        </Accordion>

                        <br></br>
                        <br></br>

                        <p>Qui potrai controllare obiettivi, eventi e molto altro...</p>
                        <p style={{opacity: '.3', paddingTop: '100px'}}>versione attuale: <strong>2.3</strong></p>
                        
                    </center>

                    <br></br>
                    <br></br>

                    <Fab variant="extended" onClick={toggleDrawer2('Altro', false)} sx={{ left: '50%', width: '50px', position: 'sticky', transform: 'translate(-50%, 0%)', bottom: '20px',}}>
                        <CloseRoundedIcon sx={{fontSize: '30px'}}/>
                    </Fab>

                </Container>
            </SwipeableDrawer>


        </span>
    )
}
