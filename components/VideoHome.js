import React, { useRef, useState, useEffect } from "react";

export default function VideoHome(props) {



    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div style={{maxWidth: '50%', position: 'absolute', display: 'block', zIndex: '150', left: '30px', bottom: '30px', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(25px)' , paddingLeft: '25px', paddingRight: '25px', borderRadius: '15px'}}>
                <h2 style={{fontFamily: 'Work Sans, sans-serif', fontWeight: '500'}}>Chainsaw Man</h2>
            </div>

            <video autoPlay loop muted playsInline style={{opacity: .5, objectFit: 'cover', width: '100%', height: '40vh', position: 'relative', zIndex: '100'}} src="https://v.animethemes.moe/ChainsawMan-OP1.webm"/>
        </div>
    )
}