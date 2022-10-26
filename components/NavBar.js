import React, { useRef, useState, useEffect } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'

export default function Home() {
    const [animationParent] = useAutoAnimate()

    const searchInput = useRef(null)
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if(searchInput.current != null){
            searchInput.current.focus()
        }
    }, [searchInput.current])
    

    const openSearch = () => {
        setIsSearching(current => !current);
        
        
    }

    return (
        <span ref={animationParent} style={{backgroundColor: 'rgba(0,0,0,0.9)'}}>
            <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '5vw', paddingLeft: '5vw'}}>
                <div>
                    <Link href="/" passHref legacyBehavior>
                        <h1 style={{fontFamily: 'Work Sans, sans-serif', cursor: 'pointer'}}>ANIME<a style={{color: 'rgb(220 135 255)'}}>CROWD</a></h1>
                    </Link>
                </div>
                
                <div>
                    <h1 style={{fontFamily: 'Work Sans, sans-serif'}}><button onClick={openSearch} style={{backgroundColor: 'transparent', borderColor: 'transparent'}}><span className="material-symbols-outlined">search</span></button></h1>
                </div>
            </nav>

            {isSearching && ( 
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', justifyContent: 'center'}}>
                    <h1 style={{fontFamily: 'Work Sans, sans-serif'}}><input ref={searchInput}/></h1>
                </div>)}

        </span>
    )
}