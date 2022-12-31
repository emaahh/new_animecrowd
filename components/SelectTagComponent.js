import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRouter } from 'next/router'



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

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <center>
            <FormControl sx={{ m: 1, width: 300 }} style={{borderRadius: '50px'}}>
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
        
            <Fab variant="extended" onClick={() => router.push('/cercaTag/' + personName)} sx={{ left: '50%', width: '50px', position: 'sticky', transform: 'translate(-50%, 0%)', bottom: '20px',}}>
                <SearchRoundedIcon sx={{fontSize: '30px'}}/>
            </Fab>
        </center>
    );
}