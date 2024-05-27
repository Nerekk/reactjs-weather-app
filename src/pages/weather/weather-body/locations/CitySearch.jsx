import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@mui/material";
import {useContext} from "react";
import {LocationsContext} from "./Locations.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const API_KEY = "a79aad9743859b7143100ca7247efd7c";

const fetchOptions = async (query) => {
    const response = await Axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query.replace(' ', '+')}&appid=${API_KEY}&limit=5`
    );
    return response.data.map(
        (item) => ({
            name: `${item.name}`,
            country: `${item.country}`,
            lon: item.lon,
            lat: item.lat,
        })
    );
};

export const CitySearch = () => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [selectedOption, setSelectedOption] = React.useState(null);

    const {locations, setLocations} = useContext(LocationsContext);

    const {
        data: options,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["fetchOptions", inputValue],
        queryFn: () => fetchOptions(inputValue),
        enabled: false,
    });

    React.useEffect(() => {
        if (inputValue) {
            refetch();
        }
    }, [inputValue, refetch]);

    const isUnique = (selected) => {
        const check = locations.find((location) => location === selected);

        return check == null;
    }

    const addLocation = () => {
        if (selectedOption && isUnique(selectedOption)) {
            setLocations((prevLocations) => [...prevLocations, selectedOption]);
            console.log("LOCATIONS: ", [...locations, selectedOption]);
        }
    };

    const opts = options && options.reduce((uniqueOpts, op) => {
        const optionText = `${op.name}, ${op.country}`;
        if (!uniqueOpts.includes(optionText)) {
            uniqueOpts.push(optionText);
        }
        return uniqueOpts;
    }, []);

    return (
        <>
            <div>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    Locations list
                </Typography>
            </div>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Autocomplete
                    id="asynchronous-demo"
                    sx={{width: 300}}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                        setSelectedOption(
                            options.find((option) => `${option.name}, ${option.country}` === newValue)
                        );
                    }}
                    options={options ? opts : []}
                    loading={isLoading}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search city"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {isLoading ? (
                                            <CircularProgress color="inherit" size={20}/>
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
                <Button onClick={addLocation}>Add to list</Button>
            </Box></>
    );
};
