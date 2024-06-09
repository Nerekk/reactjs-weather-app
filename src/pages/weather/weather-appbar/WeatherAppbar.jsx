import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import useAuth from "../../../auth/useAuth.js";
import Axios from "axios";


const LOGOUT_URL = "http://localhost:8080/api/auth/logout";

const apiLogout = async (token) => {
    try {
        const response = await Axios.get(
            LOGOUT_URL,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('JWT');
        throw error;
    }
}

const logout = (auth, setAuth, nav) => {
    // zniszcz token poprzez backend
    const token = localStorage.getItem('JWT');
    setAuth(null);
    if (token == null) return;

    apiLogout(token).then(r => {
        console.log(r);
        localStorage.removeItem('JWT');
        nav('/');
    });
}

export const WeatherAppBar = () => {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="h6" component="div">
                                Weather
                            </Typography>
                        </Grid>

                        {!auth ?

                            (<><Grid item xs={4}>
                                <Typography align="center">
                                    You are not logged in!
                                </Typography>
                            </Grid>
                                <Grid item xs={4} sx={{textAlign: 'right'}}>
                                    <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
                                </Grid></>)
                            :
                            (<><Grid item xs={4}>
                                <Typography align="center">
                                    Welcome {auth.username}!
                                </Typography>
                            </Grid>
                                <Grid item xs={4} sx={{textAlign: 'right'}}>
                                    <Button color="inherit" onClick={() => {
                                        navigate('/weather');
                                    }}>Weather</Button>
                                    <Button color="inherit" onClick={() => {
                                        navigate('/profile');
                                    }}>Profile</Button>
                                    <Button color="inherit" onClick={() => {
                                        logout(auth, setAuth, navigate);
                                    }}>Logout</Button>
                                </Grid></>)
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}