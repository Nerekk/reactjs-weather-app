import {WeatherAppBar} from "../weather/weather-appbar/WeatherAppbar.jsx";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useAuth from "../../auth/useAuth.js";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useEffect, useState} from "react";
import Axios from "axios";

const ADMIN_URL = "http://localhost:8080/api/admin/";
const ALL_USERS_URL = ADMIN_URL + 'users/all';
const DELETE_USER_URL = ADMIN_URL + 'users/delete';
const SWAP_ROLE_URL = ADMIN_URL + 'users/role';

export const AdminPage = () => {
    const {auth} = useAuth();
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('JWT');

    const fetchUsers = async () => {
        try {
            const response = await Axios.get(ALL_USERS_URL, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        // const fetchUsers = async () => {
        //     try {
        //         const response = await Axios.get(ALL_USERS_URL, {
        //             headers: {
        //                 'Authorization': `Bearer ${auth.token}`
        //             }
        //         });
        //         setUsers(response.data);
        //     } catch (error) {
        //         console.error("Failed to fetch users:", error);
        //     }
        // };

        fetchUsers();
    }, [auth.token]);

    const isCurrentAdmin = (name) => {
        return auth.username === name;
    }

    const handleChangeRole = async (userId) => {
        console.log(`${SWAP_ROLE_URL}/${userId}`);
        try {
            await Axios.put(`${SWAP_ROLE_URL}/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            // Po udanej zmianie roli, ponownie pobierz listę użytkowników
            await fetchUsers();
        } catch (error) {
            console.error("Failed to swap role:", error);
        }
    }

    const handleDeleteUser = async (userId) => {
        try {
            await Axios.delete(`${DELETE_USER_URL}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            // Po udanym usunięciu użytkownika, ponownie pobierz listę użytkowników
            await fetchUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    }


    if (!users) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <WeatherAppBar/>
            <div className={"user-info"}>
                <Box className={'form-container'} sx={{flexGrow: 1, width: "1000px"}}>
                    <Typography variant={"h4"}>Admin panel</Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            <b>Id</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            <b>Email</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            <b>Role</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            <b>Change role</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>
                                            <b>Delete</b>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">{row.id}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.role}</TableCell>
                                        <TableCell align="right">{!isCurrentAdmin(row.email) ? <Button onClick={() => handleChangeRole(row.id)}>Change</Button> :
                                            <Typography>Not possible</Typography>}</TableCell>
                                        <TableCell align="right">{!isCurrentAdmin(row.email) ? <Button onClick={() => handleDeleteUser(row.id)}>Delete</Button> :
                                            <Typography>Not possible</Typography>}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </div>
        </div>);
}