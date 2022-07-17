import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';


function LandingPageBody(){
    const Navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem("AuthToken")) {
          Navigate("/form")
        }
      },[Navigate])

    return(
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8,mt:18, pb: 6 ,boxShadow: 7  }}>
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Winter 2022
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                Welcome to YC Apply! <br></br> Log in to get started.
                    <CardActions style={{justifyContent:'center'}} sx={{mt:3}}>
                        <Button onClick={()=>{
                            Navigate('/signup')
                        }}   variant={'outlined'}>
                        Sign up or Register
                        </Button>
                    </CardActions>
                </Typography>
            </Container>
        </React.Fragment>
    )

}

export default LandingPageBody