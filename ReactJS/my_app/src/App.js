import * as React from 'react';
import './styles/App.css';
import GlobalBar from './components/myAppBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Slider from '@mui/material/Slider';
import CachedIcon from '@mui/icons-material/Cached';
import SendIcon from '@mui/icons-material/Send';
import MainGrid from './components/mainGrid'; 
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { orange } from '@mui/material/colors';

// const TH = createTheme({
//   palette: {
//     primary: {
//       main: orange[500],
//     },
//   },
// });


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <GlobalBar />
            <MainGrid />
      </header>
      
    </div>
  );
}

export default App;
