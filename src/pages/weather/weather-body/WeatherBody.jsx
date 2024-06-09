import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {MainWeather} from "./MainWeather";
import {ForecastWeather} from "./ForecastWeather";
import {createContext, useEffect, useState} from "react";
import {Charts} from "./charts/Charts";
import {Locations} from "./locations/Locations";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuth from "../../../auth/useAuth.js";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));


const URL_BACKEND = "http://localhost:8080/api/user/weather/combined/";

const isValid = (arg, targetHour) => {
    const dt = arg;
    const date = new Date(dt * 1000);

    const hour = date.getHours() + 1;
    // console.log(hour + ' ' + (hour === 15));
    return hour === targetHour;
};


const getQueryBackend = (city) => {
    return `${URL_BACKEND}${city.name},${city.country}`;
}

const getData = async (queryUrl, navigate) => {
    const token = localStorage.getItem('JWT');
    try {
        const response = await Axios.get(
            queryUrl,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
            );
        // console.log('Status Code:', response.status);
        // console.log('Data:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error Status Code:', error.response.status);
            console.error('Error Data:', error.response.data);
            navigate('/error', { state: { status: error.response.status, message: error.response.data } });
        } else if (error.request) {
            console.error('No Response:', error.request);
            navigate('/error', { state: { status: 500, message: error.message } });
        } else {
            console.error('Error', error.message);
            navigate('/error', { state: { status: 500, message: error.message } });
        }
        throw error;
    }
};

export const GlobalContext = createContext();
export const DataCurrentContext = createContext();
export const DataForecastContext = createContext();
export const DataChartsContext = createContext();


export const WeatherLayout = () => {
    // const [city, setCity] = useState({
    //     name: 'Warsaw',
    //     country: 'PL',
    //     lat: 52.2319581,
    //     lon: 21.0067249,
    // });
    const {auth} = useAuth();

    const [city, setCity] = useState(auth.locations[0] || {
        name: 'Warsaw',
        country: 'PL',
        lat: 52.2319581,
        lon: 21.0067249,
    });

    const [filteredData, setFilteredData] = useState([]);
    const [dataC, setDataC] = useState(null);
    const [dataF, setDataF] = useState(null);
    const [dataAP, setDataAP] = useState(null);

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const navigate = useNavigate();

    const {data, isLoading, refetch, error} = useQuery({
        queryKey: ["combined"],
        queryFn: () => getData(getQueryBackend(city), navigate),
    });


    useEffect(() => {
        if (data) {
            setDataC(data.weather);
            setDataF(data.forecast);
            setDataAP(data.air);
            if (data.forecast && data.forecast.list) {
                setFilteredData(data.forecast.list.filter((d) => isValid(d.dt, 15)));
            }
        }
        setIsDataLoaded(true);
        console.log("done: " + data);
    }, [data]);

    useEffect(() => {
        refetch();
    }, [city, refetch]);

    if (isLoading || !isDataLoaded) {
        return <h1>Loading..</h1>;
    }

    if (error) {
        console.log("ERORREK: " + error);
        navigate('/error');
    }

    return (
        <>
            <GlobalContext.Provider value={{city, setCity}}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Item>
                                <DataCurrentContext.Provider value={{dataC, isLoading, dataAP}}>
                                    <MainWeather/>
                                </DataCurrentContext.Provider>
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>
                                <DataForecastContext.Provider value={{filteredData, isLoading}}>
                                    <ForecastWeather/>
                                </DataForecastContext.Provider>
                            </Item>
                        </Grid>
                        <Grid item xs={9}>
                            <Item>
                                <DataChartsContext.Provider value={{dataF, isLoading}}>
                                    <Charts/>
                                </DataChartsContext.Provider>
                            </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item>
                                <Locations/>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </GlobalContext.Provider>
        </>
    );
};
