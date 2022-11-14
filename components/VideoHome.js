import React, { useRef, useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import InfoIcon from '@mui/icons-material/Info';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function VideoHome(props) {

    const [volume, setVolume] = useState(false)
    useEffect(() =>{
        if(volume==true){
            document.getElementById('videobann').volume = 0.05;
            document.getElementById('videobann').muted = false
        }else{
            document.getElementById('videobann').volume = 0.1;
            document.getElementById('videobann').muted = true
        }
    },[volume])


    return (
        <div style={{backgroundClip: 'content-box', padding: '1px', width: '100%', position: 'relative'}}>

            <div style={{left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', display: 'block', zIndex: '300', bottom: '3vh', width: 'max-content',}}>
                <h1 style={{textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px', fontFamily: 'Work Sans, sans-serif', fontWeight: '500'}}>{props.Titolo}</h1>
                <br></br>
            </div>
            <Container maxWidth="sm" style={{left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', display: 'flex', zIndex: '300', bottom: '3vh'}}>
                <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{paddingRight: '20px', paddingLeft: '20px', width: '100%', borderRadius: '15px', }}>
                    <InfoIcon sx={{ color: 'black', mr: 1, fontSize: 25 }}/><strong style={{fontSize: 20}}>ALTRO</strong>
                </Button>
                &nbsp;
                {volume? 
                
                    <Button onClick={()=>setVolume(false)} className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{paddingRight: '20px', paddingLeft: '20px', width: '20%', borderRadius: '15px', }}>
                        <strong style={{fontSize: 20}}>🔊</strong>
                    </Button>

                : 

                    <Button onClick={()=>setVolume(true)} className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{paddingRight: '20px', paddingLeft: '20px', width: '20%', borderRadius: '15px', }}>
                        <strong style={{fontSize: 20}}>🔈</strong>
                    </Button>

                }
            </Container>
            

            <video className="videobann" id="videobann" autoPlay loop playsInline style={{opacity: .5, objectFit: 'cover', width: '100%', height: '70vh', position: 'relative', zIndex: '100'}} src={props.OP}/>
            <div variant="contained" className="videoHome"></div>
            <style jsx global>
                {`
                    .videobann{
                        -webkit-mask-image: linear-gradient(transparent, black 20%, transparent);
                        mask-image: linear-gradient (transparent, black 20%, transparent);
                    }
                    .videoHome {
                        left: -1px;
                        width: -webkit-fill-available;
                        position: absolute;
                        top: 0;
                        height: 100%;

                        
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
    )
}