import React, { useRef, useState, useEffect, use } from "react";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRouter } from 'next/router'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'

import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

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
import { RuleSharp } from "@mui/icons-material";




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Arti Marziali',
  'Avanguardia',
  'Avventura',
  'Azione',
  'Bambini',
  'Commedia',
  'Demoni',
  'Drammatico',
  'Ecchi',
  'Fantasy',
  'Gioco',
  'Harem',
  'Hentai',
  'Horror',
  'Josei',
  'Magia',
  'Mecha',
  'Militari',
  'Mistero',
  'Musicale',
  'Parodia',
  'Polizia',
  'Psicologico',
  'Romantico',
  'Samurai',
  'Sci-Fi',
  'Scolastico',
  'Seinen',
  'Sentimentale',
  'Shoujo',
  'Shoujo Ai',
  'Shounen',
  'Shounen Ai',
  'Slice of Life',
  'Spazio',
  'Soprannaturale',
  'Sport',
  'Storico',
  'Superpoteri',
  'Thriller',
  'Vampiri',
  'Veicoli',
  'Yaoi',
  'Yuri',
];

export default function SelectTagComponent() {
    const router = useRouter();
    const [personName, setPersonName] = React.useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    function searchTag(){
        fetch('/api/searchViaGeneri/'+ personName)
            .then((res) => res.json())
            .then((data) => {
                setSearchResult(data)
            })
    }

    return (
        <center>
            <FormControl sx={{ m: 1, width: '80%' }} style={{borderRadius: '50px'}}>
                <InputLabel id="demo-multiple-checkbox-label">Cerca generi</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Cerca generi" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{borderRadius: '50px'}}
                >
                {names.map((name) => (
                    <MenuItem key={name} value={name} >
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        
            <br></br>
            <br></br>
        
            <Fab variant="extended" onClick={() => searchTag()} sx={{width: '50px'}}>
                <SearchRoundedIcon sx={{fontSize: '30px'}}/>
            </Fab>
            &nbsp; 
            <Fab variant="extended" onClick={() => {setSearchResult([]), setPersonName([])}} sx={{width: '50px'}}>
                <CloseRoundedIcon sx={{fontSize: '30px'}}/>
            </Fab>
            
            <br></br>
            <br></br>


            <div style={{border: '5px solid white', padding: '10px', backgroundColor: '#ffffff', width: '100%', height: '100%', borderRadius: '15px', maxHeight: '80vh', overflowY: 'scroll', overflowX: 'hidden'}}>

                {searchResult.length == 0 ? 
                    <center>
                        <p style={{fontSize: '10px', color: 'rgba(0,0,0,0.7)'}}>Nessun anime trovato :(</p>
                    </center> 
                : 
                                    
                    searchResult.map((_, index) => (
                        _.IdAW?
                            <Link href={'/anime/'+ _._id} passHref key={_.id}>
                                <div style={{backgroundColor: 'rgba(0,0,0)', padding: '15px', margin: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center'}}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 'auto', borderRadius: '10px', }}
                                        style={{objectFit: 'cover', height: '70px', marginRight: '10px'}}
                                        image={_.Copertina}
                                        alt={'Copertina di ' + _.Nome}
                                    />
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                        <h4 style={{marginBottom: '0px'}}>{_.Nome}</h4>
                                        <p style={{fontSize: '9px', color: 'rgba(255,255,255,0.5)'}}><strong>STATO:</strong> {_.Stato} <strong>USCITA:</strong> {_.Uscita}</p>
                                    </div>
                                </div>
                            </Link>
                        :null
                    ))
                                
                }
            </div>
        </center>
    );
}