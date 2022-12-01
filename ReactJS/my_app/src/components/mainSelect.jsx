import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { alphabets } from './functional/otherFunc';
import { setAlphabet, getAlphabet } from './functional/Storage';

function LoadListItems() {
    let MenuItems = []
    let counter = 0
    alphabets.forEach(elem => {
        MenuItems.push(<MenuItem value={counter}>{elem.name}</MenuItem>)
        counter++
    })
    return(
        MenuItems
    );
}

export default function BasicSelect() {
  const [Alphabets, setSelect] = React.useState("");

  const handleChange = (event) => {
    setSelect(event.target.value);
    setAlphabet(event.target.value)
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Alphabet</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleChange}
          value={getAlphabet()}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {LoadListItems()}
        </Select>
      </FormControl>
    </div>
  );
}