import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import {Button, Link} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import '../../App.css';
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuth from "../../auth/useAuth.js";

const USERNAME_ERROR = "Invalid username! (3-20 characters)";
const PASSWORD_ERROR = "Invalid password! (3-20 characters)";
const MATCH_ERROR = "Passwords not matching!";

const LOGIN_URL = "http://localhost:8080/api/auth/authenticate";
const REGISTER_URL = "http://localhost:8080/api/auth/register";

export const LoginPage = () => {
    const [newUser, setNewUser] = useState(false);
    // const [user, setUser] = useState({});
    const { setAuth } = useAuth();
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const schemaRegister = yup.object({
        username: yup.string().min(3).max(20).required(USERNAME_ERROR),
        password: yup.string().min(3).max(20).required(PASSWORD_ERROR),
        password_repeat: yup.string().oneOf([yup.ref('password'), null]).required(MATCH_ERROR),
    });

    const schemaLogin = yup.object({
        username: yup.string().min(3).max(20).required(USERNAME_ERROR),
        password: yup.string(),
    });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schemaRegister),
    });

    const {register: login, handleSubmit: handleLogin, formState: {errors: errorsLogin}, reset: resetLogin} = useForm({
        resolver: yupResolver(schemaLogin),
    });

    useEffect(() => {
        reset();
        resetLogin();
        setErrMsg("");
    }, [newUser, reset, resetLogin]);


    const onAuth = async (data, isLogin) => {
        console.log(data);
        const URL = isLogin ? LOGIN_URL : REGISTER_URL;

        try {
            const response = await Axios.post(URL, JSON.stringify({
                    email: data.username,
                    password: data.password,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            const accessToken = response?.data?.access_token;
            const userRole = response?.data?.role;
            const locations = response.data.locations;
            setAuth({
                username: data.username,
                token: accessToken,
                role: userRole,
                locations: locations,
            })
            setErrMsg('Success');
            localStorage.setItem('JWT', accessToken);
            navigate('/weather');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status) {
                setErrMsg('Error code: ' + err.response?.status);
            } else {
                setErrMsg('Login failed');
            }
        }
    };

    const handleOnRegister = (data) => onAuth(data, false);
    const handleOnLogin = (data) => onAuth(data, true);

    return (
        <div className="container">
            <Typography variant={'h1'} gutterBottom className="weather-title">Weather</Typography>
            <Box className="form-container">
                {newUser ? <form onSubmit={handleSubmit(handleOnRegister)} className="form">
                    <Typography variant={"body1"} fontSize={30}>Create an account</Typography>
                        {errMsg.length > 0 && <Typography>{errMsg}</Typography>}
                    <TextField error={!!errors.username} helperText={errors.username && USERNAME_ERROR} label="Username"
                               variant="filled" {...register("username")} />
                    <TextField error={!!errors.password} helperText={errors.password && PASSWORD_ERROR} type="password"
                               label="Password"
                               variant="filled" {...register("password")} />
                    <TextField error={!!errors.password_repeat} helperText={errors.password_repeat && MATCH_ERROR}
                               type="password" label="Confirm password"
                               variant="filled" {...register("password_repeat")} />
                    <Typography>
                        Having an account? <Link sx={{ cursor: 'pointer' }} onClick={() => setNewUser(false)}>Sign in</Link>
                    </Typography>

                    <Button variant="contained" type={"submit"}>Sign up</Button>
                </form> : <form onSubmit={handleLogin(handleOnLogin)} className="form">
                    <Typography variant={"body1"} fontSize={30}>Sign in</Typography>
                    {errMsg.length > 0 && <Typography>{errMsg}</Typography>}
                    <TextField error={!!errorsLogin.username} helperText={errorsLogin.username && USERNAME_ERROR} label="Username"
                               variant="filled" {...login("username")} />
                    <TextField type="password"
                               label="Password"
                               variant="filled" {...login("password")} />
                    <Typography>
                        Dont have an account? <Link sx={{ cursor: 'pointer' }} onClick={() => setNewUser(true)}>Sign up</Link>
                    </Typography>

                    <Button variant="contained" type={"submit"}>Sign in</Button>
                </form>}
            </Box>
        </div>
    );
}