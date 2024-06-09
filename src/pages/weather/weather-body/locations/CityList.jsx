import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {useCallback, useContext, useEffect, useState} from "react";
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import {GlobalContext} from "../WeatherBody.jsx";
import Axios from "axios";
import useAuth from "../../../../auth/useAuth.js";

const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

const LOCATIONS_URL = "http://localhost:8080/api/user/locations/put";

export const CityList = () => {
    const {city, setCity} = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('JWT');
    const {auth, setAuth} = useAuth();
    

    const handleDelete = (index) => {
        const newLocations = auth.locations.filter((_, i) => i !== index);

        const newAuth = {
            ...auth,
            locations: newLocations,
        };
        setAuth(newAuth);
        postLocations(newLocations);

    };

    const setCurrentLocation = (loc) => {
        setCity({
            name: loc.name.replace(' ', '+'),
            country: loc.country,
            lat: loc.lat,
            lon: loc.lon,
        });
    }

    const isActualLocation = (loc) => {
        return (city.name === loc.name.replace(' ', '+') && city.country === loc.country);
    }

    const postLocations = useCallback(async (locations) => {
        try {
            await Axios.post(
                LOCATIONS_URL,
                JSON.stringify({ locations }),
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log("Locations updated successfully");
        } catch (error) {
            console.error("Failed to post locations:", error);
        } finally {
            setIsLoading(false);

        }
    }, [token]);

    useEffect(() => {
        if (auth.locations.length) {
            // Debounce logic to avoid multiple POST requests in quick succession
            const handler = setTimeout(() => postLocations(auth.locations), 1000);
            return () => clearTimeout(handler);
        }
    }, [auth.locations, postLocations]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{flexGrow: 1, width: "100%"}}>
            <Grid item xs={12} md={6}>
                <Demo>
                    <List sx={{width: "100%"}}>
                        {auth.locations.map((location, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <IconButton onClick={() => setCurrentLocation(location)}>
                                        {isActualLocation(location) ? <GpsFixedIcon/> : <GpsNotFixedIcon/>}
                                    </IconButton>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={location.name}
                                    secondary={location.country}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Demo>
            </Grid>
        </Box>
    );
}
