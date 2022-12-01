import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#282c34',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    boxShadow: 'none',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
