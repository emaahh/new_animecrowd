import React, { useRef, useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoIcon from '@mui/icons-material/Info';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import Link from 'next/link'

function CardComponent(props) {
    const [state, setState] = React.useState({bottom: false,});


    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
    
        setState({ ...state, ['bottom']: open });

    };


    return (
        <>
        <BrowserView>
            <Card sx={{backgroundColor:'rgb(0 0 0 / 50%)', display: 'flex', marginBottom: '30px', flexDirection: 'row-reverse', justifyContent: 'flex-end', borderRadius: '15px'}}>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', overflow: 'auto'}}>

                    <CardContent sx={{ flex: '1 0 auto',}}>
                        <Typography noWrap variant="h6" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '220px'}}>
                            {props.Nome}
                            
                        </Typography>
                        {
                            !props.EPISODE?
                                <>
                                    <Typography variant="p" color="text.secondary" component="div" noWrap>
                                        <strong>Uscita:</strong> {props.Uscita}
                                    </Typography>
                                    <Typography variant="p" color="text.secondary" component="div" noWrap>
                                        <strong>Stato:</strong> {props.Stato}
                                    </Typography>
                                </>
                            : 
                                <>
                                    <Typography variant="p" color="text.secondary" component="div" noWrap>
                                        <strong>Episodio:</strong> {props.Nome.split('Ep. ').pop()}
                                    </Typography>
                                    <Typography variant="p" color="text.secondary" component="div" noWrap>
                                        <strong>Uscita:</strong> {props.Uscita}
                                    </Typography>
                                    <Typography variant="p" color="text.secondary" component="div" noWrap>
                                        <strong>Stato:</strong> {props.Stato}
                                    </Typography>
                                </>
                        }
                        
                    </CardContent>

                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1,  pr: 1, pb: 1, justifyContent: 'center', width: '100%' }}>
                        <Button onClick={toggleDrawer('bottom', true)} className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}} style={{width: '100%', borderRadius: '15px'}}>
                            <InfoIcon sx={{ color: 'black', mr: 1, fontSize: 25 }}/><strong>ALTRO</strong>
                        </Button>
                    </Box>

                </Box>

                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    style={{objectFit: 'cover', height: '200px'}}
                    image={props.Copertina}
                    alt={'Copertina di '+ props.Nome}
                />

            </Card>
        </BrowserView>
        <MobileView>
            <div style={{padding: '10px',}} onClick={toggleDrawer('bottom', true)}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    style={{objectFit: 'cover', height: '200px', borderRadius: '15px'}}
                    image={props.Copertina}
                    alt={'Copertina di '+ props.Nome}
                />
            </div>

        </MobileView>


            <SwipeableDrawer anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)} onOpen={toggleDrawer('bottom', true)}>
                <Container style={{padding: '50px'}} maxWidth="lg">
                    <center>

                        <br></br>
                        <br></br>

                        <CardMedia
                            component="img"
                            sx={{ width: 151, borderRadius: '15px', }}
                            style={{objectFit: 'cover', height: '200px'}}
                            image={props.Copertina}
                            alt={'Copertina di '+ props.Nome}
                        />

                        <h1 style={{fontFamily: 'Work Sans, sans-serif', textTransform: 'uppercase', fontWeight: 'extrabold'}}><strong>{props.Nome}</strong></h1>
                            
                        <Link href={'/anime/'+props.Id} passHref legacyBehavior>
                            <Button className="btnPlayCopertina" variant="contained" sx={{backgroundColor: 'white'}} style={{width: '100%', borderRadius: '15px'}}>
                                <PlayArrowRoundedIcon sx={{ color: 'black', fontSize: 30 }}/><strong>Guarda</strong>
                            </Button>
                        </Link>
                        <br></br>
                        <br></br>
                        <br></br>

                    </center>
                    <br></br>
                    <center>
                        <table style={{width: '100%', textAlign: 'center', tableLayout: 'fixed', opacity: '0.5'}}>
                            <tr>
                                <th>STATO</th>
                                <th>USCITA</th>
                            </tr>
                            <tr>
                                <td>{props.Stato}</td>
                                <td>{props.Uscita}</td>
                            </tr>
                        </table>
                    </center>
                    <br></br>
                    <br></br>
                    <center>
                        <table style={{width: '100%', textAlign: 'center', tableLayout: 'fixed', opacity: '0.5'}}>
                            <tr>
                                <th>GENERI</th>
                            </tr>
                            <tr>
                                <td>{props.Generi.replace(/ - /g, ' | ')}</td>
                            </tr>
                        </table>
                    </center>
                    <br></br>
                    <br></br>
                    <Fab variant="extended" onClick={toggleDrawer('bottom', false)} sx={{ left: '50%', width: '50px', position: 'sticky', transform: 'translate(-50%, 0%)', bottom: '20px',}}>
                        <CloseRoundedIcon sx={{fontSize: '30px'}}/>
                    </Fab>
                </Container>
            </SwipeableDrawer>
            
        </>
    )
}

export default CardComponent