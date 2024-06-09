import {WeatherAppBar} from "../weather/weather-appbar/WeatherAppbar.jsx";
import {Box, Button, Link} from "@mui/material";
import useAuth from "../../auth/useAuth.js";
import Axios from "axios";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const CHANGE_PASS_URL = "http://localhost:8080/api/user/changepass";
const PASSWORD_ERROR = "Invalid password! (3-20 characters)";
const MATCH_ERROR = "Passwords not matching!";

export const ProfilePage = () => {
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState("");

    const schemaRegister = yup.object({
        old_password: yup.string().min(3).max(20).required(PASSWORD_ERROR),
        password: yup.string().min(3).max(20).required(PASSWORD_ERROR),
        password_repeat: yup.string().oneOf([yup.ref('password'), null]).required(MATCH_ERROR),
    });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schemaRegister),
    });

    const changePassword = async (data) => {
        // password change logic
        console.log(data);
        const token = localStorage.getItem('JWT');
        try {
            const response = await Axios.patch(CHANGE_PASS_URL, JSON.stringify({
                    currentPassword: data.old_password,
                    newPassword: data.password,
                    confirmationPassword: data.password_repeat,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true,
                }
            );
            console.log(response.data);

            setErrMsg('Success');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status) {
                setErrMsg('Error code: ' + err.response?.status);
            } else {
                setErrMsg('Login failed');
            }
        }
    }

    return (
        <div>
            <WeatherAppBar/>
            <div className={"user-info"}>
                <Box className={'form-container'} sx={{flexGrow: 1, width: "400px"}}>
                    <Typography variant={"h4"}>User info</Typography>
                    <Box>
                        <Typography>Email: {auth && auth.username}</Typography>
                        <Typography>Role: {auth && auth.role}</Typography>
                        <br/>
                        <Typography>Locations:</Typography>
                        {/* eslint-disable-next-line react/jsx-key */}
                        {auth && auth.locations.length > 0 ? auth.locations.map((location) =>  (<Typography> - {location.name + ', ' + location.country} </Typography>)
                            )
                            :
                            <Typography>None</Typography>
                        }
                    </Box>
                </Box>

                <form onSubmit={handleSubmit(changePassword)} className="form">
                    <Typography variant={"body1"} fontSize={28} sx={{marginTop: 5}} >Change password:</Typography>
                    {errMsg.length > 0 && <Typography>{errMsg}</Typography>}
                    <TextField error={!!errors.old_password} helperText={errors.old_password && PASSWORD_ERROR} type="password"
                               label="Password" variant="filled" {...register("old_password")} />
                    <TextField error={!!errors.password} helperText={errors.password && PASSWORD_ERROR} type="password"
                               label="New password"
                               variant="filled" {...register("password")} />
                    <TextField error={!!errors.password_repeat} helperText={errors.password_repeat && MATCH_ERROR}
                               type="password" label="Confirm new password"
                               variant="filled" {...register("password_repeat")} />

                    <Button variant="contained" type={"submit"}>Change password</Button>
                </form>
            </div>
        </div>);
}