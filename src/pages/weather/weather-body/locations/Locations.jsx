import { Box } from "@mui/material";
import { CitySearch } from "./CitySearch";
import {CityList} from "./CityList.jsx";
import {createContext, useState} from "react";

export const LocationsContext = createContext();

export const Locations = () => {
    const [locations, setLocations] = useState([]);
    return (
        <Box>
            <LocationsContext.Provider value={{locations, setLocations}}>
                <CitySearch/>
                <CityList/>
            </LocationsContext.Provider>
        </Box>
    );
}