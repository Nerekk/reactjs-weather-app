import {useEffect, useState, useRef} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import {Button, Link} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import '../../App.css';

const USERNAME_ERROR = "Invalid username! (3-20 characters)";
const PASSWORD_ERROR = "Invalid password! (3-20 characters)";
const MATCH_ERROR = "Passwords not matching!";

export const LoginPage = () => {
    const [newUser, setNewUser] = useState(false);

    const schemaRegister = yup.object({
        username: yup.string().min(3).max(20).required(USERNAME_ERROR),
        password: yup.string().min(3).max(20).required(PASSWORD_ERROR),
        password_repeat: yup.string().oneOf([yup.ref('password'), null]).required(MATCH_ERROR),
    });

    const schemaLogin = yup.object({
        username: yup.string().min(3).max(20).required(USERNAME_ERROR),
        password: yup.string(),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schemaRegister),
    });

    const {register: login, handleSubmit: handleLogin, formState: {errors: errorsLogin}} = useForm({
        resolver: yupResolver(schemaLogin),
    });

    const onRegister = (data) => {
        console.log(data);
    };

    const onLogin = (data) => {
        console.log(data);
    };

    return (
        <div className="container">
            <Typography variant={'h1'} gutterBottom className="weather-title">Weather</Typography>
            <Box className="form-container">
                {newUser ? <form onSubmit={handleSubmit(onRegister)} className="form">
                    <Typography variant={"body1"} fontSize={30}>Create an account</Typography>
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
                </form> : <form onSubmit={handleLogin(onLogin)} className="form">
                    <Typography variant={"body1"} fontSize={30}>Sign in</Typography>
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