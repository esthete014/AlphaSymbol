import React from "react";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'


export default function GlobalBar() {
    return(
            <AppBar>
                <Container position='fidex'>
                <Toolbar>
                    <Typography variant="button">
                    AlphaSymbol
                    </Typography> 
                </Toolbar>
                </Container>
            </AppBar>
    
    );
}
