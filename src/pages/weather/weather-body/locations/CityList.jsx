import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext} from "react";
import {LocationsContext} from "./Locations.jsx";

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

export const CityList = () => {
    const {locations, setLocations} = useContext(LocationsContext);

    const handleDelete = (index) => {
        setLocations(prevLocations => prevLocations.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{flexGrow: 1, width: "100%"}}>
            <Grid item xs={12} md={6}>
                <Demo>
                    <List sx={{width: "100%"}}>
                        {locations.map((location, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={location.name}
                                    secondary={location.description}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Demo>
            </Grid>
        </Box>
    );
}