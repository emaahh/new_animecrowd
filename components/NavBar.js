import React, { useRef, useState, useEffect } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';


export default function Home() {
    const [animationParent] = useAutoAnimate()

    const searchInput = useRef(null)
    const [isSearching, setIsSearching] = useState(false)
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState([])

    function handleChangeInput(event) {
        setQuery(event.target.value)
    }

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


    useEffect(() => {
        if(searchInput.current != null){
            searchInput.current.focus()
        }
    }, [searchInput.current])

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
                
                <div id="serchIco" style={{marginRight: '-5vw', paddingRight: '5vw'}}>
                    <h1 style={{fontFamily: 'Work Sans, sans-serif'}}><button onClick={openSearch} style={{cursor: 'pointer', backgroundColor: 'transparent', borderColor: 'transparent', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px'}}><strong>{!isSearching ? <SearchIcon/> : <CloseIcon/>}</strong></button></h1>
                </div>
            </nav>

            {isSearching && ( 
                <>
                    <div className="blur" style={{position: 'fixed', marginTop: '-80px', height: '120vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: '-1'}}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', justifyContent: 'center'}}>

                        <Container style={{}} maxWidth="sm">

                            <Fab variant="extended" sx={{width: '100%', backgroundColor: '#ffffff!important'}} className="searchInputWrapper">
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

                            <br></br><br></br>

                            <div style={{border: '5px solid white', padding: '15px', backgroundColor: '#ffffff', width: '100%', height: '100%', borderRadius: '15px', maxHeight: '50vh', overflowY: 'scroll'}}>

                                {searchResult.length == 0 ? <center><p style={{fontSize: '10px', color: 'rgba(0,0,0,0.5)'}}>Digita almeno 3 caratteri o cambia parola chiave</p></center> : 
                                    
                                    searchResult.map((_, index) => (
                                        <Link href={'/anime/'+ _._id} passHref onClick={openSearch}>
                                            <div style={{backgroundColor: 'rgba(0,0,0)', padding: '15px', marginBottom: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center'}}>
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

        </span>
    )
}