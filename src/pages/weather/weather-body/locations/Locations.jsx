import {Box} from "@mui/material";
import {CitySearch} from "./CitySearch";
import {CityList} from "./CityList.jsx";

export const Locations = () => {

    return (
        <Box>
            <CitySearch/>
            <CityList/>
        </Box>
    );
}