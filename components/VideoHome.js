import React, { useRef, useState, useEffect } from "react";

import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';


export default function VideoHome(props) {

    return (
        <div style={{backgroundClip: 'content-box', padding: '1px', width: '100%', position: 'relative'}}>

            <div style={{left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', display: 'block', zIndex: '300', bottom: '3vh', width: 'max-content',}}>
                <h1 style={{textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px', fontFamily: 'Work Sans, sans-serif', fontWeight: '500'}}>{props.Titolo}</h1>
                <br></br>
            </div>
            <div style={{left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', display: 'block', zIndex: '300', bottom: '3vh', width: '25%', minWidth: '120px'}}>
                <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}}  style={{paddingRight: '20px', paddingLeft: '20px', width: '100%', borderRadius: '15px', }}>
                    <InfoIcon sx={{ color: 'black', mr: 1, fontSize: 25 }}/><strong style={{fontSize: 20}}>ALTRO</strong>
                </Button>
            </div>
            

            <video className="videobann" autoPlay loop muted playsInline style={{opacity: .5, objectFit: 'cover', width: '100%', height: '70vh', position: 'relative', zIndex: '100'}} src={props.OP}/>
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