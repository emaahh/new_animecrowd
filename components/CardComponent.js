import React, { useRef, useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import Link from 'next/link'

function CardComponent(props) {


    return (
        <>
            <Card sx={{backgroundColor:'rgb(0 0 0 / 50%)', display: 'flex', marginBottom: '30px', flexDirection: 'row-reverse', justifyContent: 'flex-end', borderRadius: '15px'}}>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', overflow: 'auto'}}>

                    <CardContent sx={{ flex: '1 0 auto',}}>
                        <Typography noWrap variant="h6" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%'}}>
                            {props.Nome}
                            
                        </Typography>
                        
                        <Typography variant="p" color="text.secondary" component="div" noWrap>
                            <strong>Uscita:</strong> {props.Uscita}
                        </Typography>
                        <Typography variant="p" color="text.secondary" component="div" noWrap>
                            <strong>Stato:</strong> {props.Stato}
                        </Typography>
                    </CardContent>

                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1,  pr: 1, pb: 1, justifyContent: 'center', width: '100%' }}>
                        <Link href={'/anime/'+props.Id} passHref legacyBehavior>
                            <Button variant="contained" color="success" style={{width: '100%', borderRadius: '15px'}}>
                                <PlayArrowRoundedIcon sx={{ color: 'white', fontSize: 30 }}/>
                            </Button>
                        </Link>
                    </Box>

                </Box>

                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    style={{objectFit: 'cover', height: '200px'}}
                    image={props.Copertina}
                    alt={'Copertina '+ props.Nome}
                />

            </Card>
        </>
    )
}

export default CardComponent