import React, { useRef, useState, useEffect } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import Avatar from '@mui/material/Avatar';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';


export default function Home() {
    const [animationParent] = useAutoAnimate()

    const searchInput = useRef(null)
    const [isSearching, setIsSearching] = useState(false)
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [state, setState] = useState({right: false,});

    const [logPage, setLogPage] = useState(0);
    const [isLog, setIsLog] = useState(false);
    const [accountData, setAccountData] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    
        setState({ ...state, ['right']: open });

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

    async function LogIn(emailPROPS, passwordPROPS) {
        const res = await fetch('/api/logIn/'+emailPROPS+'/'+passwordPROPS);
        return (setAccountData(await res.json()))
    }
    //check credenziali
    useEffect(() => {
        if(accountData!=[]&&accountData!=''){
            setIsLog(true)
            if(!hasCookie('email') && !hasCookie('password')){
                setCookie('email', email, {maxAge:new Date().getTime() + (24*60*60*60*1000)});
                setCookie('password', password, {maxAge:new Date().getTime() + (24*60*60*60*1000)});
            }
        }
    }, [accountData])

    //auto login
    useEffect(() => {
        if(hasCookie('email') && hasCookie('password')){
            LogIn(getCookie('email'),getCookie('password'))
        }
    }, [])


    //logout
    function logOut(){
        setAccountData('')
        setIsLog(false)
        setUserName('')
        setEmail('')
        setPassword('')
        deleteCookie('email');
        deleteCookie('password');
    }

    //serch
    useEffect(() => {
        if(query.trim().length >= 3){
            fetch('/api/searchAnimeUser/'+ query)
                .then((res) => res.json())
                .then((data) => {
                    setSearchResult(data)
                })
        }else{
            setSearchResult([])
        }
    }, [query])

    //focus on serch box
    useEffect(() => {
        if(searchInput.current != null){
            searchInput.current.focus()
        }
    }, [searchInput.current])

    //block scroll
    useEffect(() => {
        if(isSearching){
            document.getElementsByTagName("body")[0].style.overflowY = "hidden"
        }else{
            document.getElementsByTagName("body")[0].style.overflowY = "scroll"
        }
    }, [isSearching])
    

    const openSearch = () => {
        setIsSearching(current => !current);
        setSearchResult([])
    }

    //nav background dynamic
    useEffect(() => {
        window.onscroll = function() {scrollFunction()};
        function scrollFunction() {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                document.getElementById("navbar").style.backgroundColor = "black";
            } else {
                document.getElementById("navbar").style.backgroundColor = "transparent";
            }
        }
    }, [])


    return (
        <span id="navbar" ref={animationParent} style={{zIndex: '999999999999999999', position: 'fixed', width: '100%'}}>

            <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '5vw', paddingLeft: '5vw', zIndex: '99999999999999999918'}}>
                <div>
                    <Link href="/" passHref legacyBehavior>
                        <h1 style={{fontFamily: 'Work Sans, sans-serif', cursor: 'pointer', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px',}}>ANIME<a style={{color: 'rgb(220 135 255)', textShadow: 'rgba(220, 135, 255, 0.8) 0px 0px 20px',}}>CROWD</a></h1>
                    </Link>
                </div>
                
                
                <div id="serchIco" style={{marginRight: '-5vw', paddingRight: '5vw', display: 'flex'}}>
                    <h1 style={{fontFamily: 'Work Sans, sans-serif'}}><button onClick={toggleDrawer('right', true)} style={{cursor: 'pointer', backgroundColor: 'transparent', borderColor: 'transparent', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px'}}><strong>{!isLog ? <NoAccountsIcon/> : <Avatar alt="Avatar"sx={{ width: 26, height: 26 }} src={'https://i.imgur.com/'+accountData[0].Avatar+'b.jpg'} />}</strong></button></h1>
                    <h1 style={{fontFamily: 'Work Sans, sans-serif'}}><button onClick={openSearch} style={{cursor: 'pointer', backgroundColor: 'transparent', borderColor: 'transparent', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px'}}><strong>{!isSearching ? <SearchIcon/> : null}</strong></button></h1>
                </div>
            </nav>

            {isSearching && ( 
                <>
                    <div className="blur" style={{position: 'fixed', marginTop: '-80px', height: '120vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: '-1'}}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', justifyContent: 'center'}}>

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

                                {searchResult.length == 0 ? <center><p style={{fontSize: '10px', color: 'rgba(0,0,0,0.5)'}}>Digita almeno 3 caratteri o cambia parola chiave</p></center> : 
                                    
                                    searchResult.map((_, index) => (
                                        <Link href={'/anime/'+ _._id} passHref onClick={openSearch}>
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
                                    ))
                                
                                }
                                

                            </div>

                        </Container>
                    </div>
                </>

            )}

            {!isLog ? 
                <SwipeableDrawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)} onOpen={toggleDrawer('right', true)}  ref={animationParent}>
                    <Container style={{padding: '50px'}} maxWidth="sm"  ref={animationParent}>
                        <br></br>
                        <br></br>
                        <center  ref={animationParent}>
                            <Fab variant="extended" onClick={toggleDrawer('bottom', false)}>
                                <CloseRoundedIcon/>
                                <strong>CHIUDI</strong>
                            </Fab>
                            
                            <h1>Benvenuto!</h1>
                            
                            <div ref={animationParent}>
                                {logPage == 0 ? 
                                    <div className="accedi" ref={animationParent}>
                                        <h3>Accedi!</h3>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Email" variant="standard" onChange={handleChangeEmail}/>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <VpnKeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Password" variant="standard" onChange={handleChangePassword} type={'password'}/>
                                        </Box>

                                        <br></br>
                                        {accountData==[]? null:<h3>Credenziali errate</h3>}
                                        <Fab variant="extended" color={email!=''&&password!='' ? "success" : "error"} onClick={()=> email!=''&&password!='' ? LogIn(email,password) : null}>
                                            <strong>ENTRA</strong>
                                        </Fab>

                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                        <Fab variant="extended" onClick={() => setLogPage(1)}>
                                            <strong>crea un account</strong>
                                        </Fab>
                                    </div>

                                    : 

                                    <div className="registrati" ref={animationParent}>
                                        <h3>Registrati!</h3>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Nome utente" variant="standard" onChange={handleChangeUserName} inputProps={{ maxLength: 11 }}/>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Email" variant="standard" onChange={handleChangeEmail} />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <VpnKeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField id="input-with-sx" label="Password" variant="standard" onChange={handleChangePassword} inputProps={{ maxLength: 11 }} type={'password'}/>
                                        </Box>

                                        <br></br>
                                        <Fab variant="extended" color={userName!=''&&email!=''&&password!='' ? "success" : "error"} onClick={email!=''&&password!='' ? () => alert('vai') : null}>
                                            <strong>ENTRA</strong>
                                        </Fab>

                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                        <Fab variant="extended" onClick={() => setLogPage(0)}>
                                            <strong>Accedi</strong>
                                        </Fab>
                                    </div>
                            
                                }
                            </div>
                            
                        </center>
                    </Container>
                </SwipeableDrawer>

                : 
                
                <SwipeableDrawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)} onOpen={toggleDrawer('right', true)}  ref={animationParent}>
                    <Container style={{padding: '50px'}} maxWidth="sm"  ref={animationParent}>
                        <br></br>
                        <br></br>
                        <center  ref={animationParent}>
                            <Fab variant="extended" onClick={toggleDrawer('bottom', false)}>
                                <CloseRoundedIcon/>
                                <strong>CHIUDI</strong>
                            </Fab>
                            
                            <h1>Benvenuto! {accountData[0].NomeUtente}</h1>

                            <Fab variant="extended" color={'warning'} onClick={() => logOut()}>
                                <LogoutIcon/>
                                <strong>LOGOUT</strong>
                            </Fab>
                            
                            
                        </center>
                    </Container>
                </SwipeableDrawer>
            
            }

        </span>
    )
}