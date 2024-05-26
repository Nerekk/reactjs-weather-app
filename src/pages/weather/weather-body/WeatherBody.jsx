import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MainWeather } from "./MainWeather";
import { ForecastWeather } from "./ForecastWeather";
import { Button } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Charts } from "./charts/Charts";
import { Locations } from "./locations/Locations";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



const URL_C = "https://api.openweathermap.org/data/2.5/weather";
const URL_F = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "a79aad9743859b7143100ca7247efd7c";
const UNITS = "metric";

const isValid = (arg, targetHour) => {
  const dt = arg;
  const date = new Date(dt * 1000);

  const hour = date.getHours() + 1;
  // console.log(hour + ' ' + (hour === 15));
  return hour === targetHour;
};

const getQueryURL = (url, city) => { return `${url}?appid=${API_KEY}&units=${UNITS}&q=${city}`; };

const getData = async (queryUrl, filtered) => {
  const data = await Axios.get(queryUrl).then((res) => res.data);
  if (filtered) {
    const filteredData = data.list.filter((d) => isValid(d.dt, 15));
    return filteredData;
  } else {
    return data;
  }
};

export const GlobalContext = createContext();
export const DataCurrentContext = createContext();
export const DataForecastContext = createContext();


export const WeatherLayout = () => {
  const [city, setCity] = useState("warsaw");

  const { data: dataC, isLoading: isLoadingC, refetch: refetchC} = useQuery({
    queryKey: ["current"],
    queryFn: () => getData(getQueryURL(URL_C, city), false),
  });

  const { data: dataF, isLoading: isLoadingF, refetch: refetchF} = useQuery({
    queryKey: ["forecast"],
    queryFn: () => getData(getQueryURL(URL_F, city), true),
  });

  useEffect(() => {
    refetchC();
    refetchF();
    console.log("done");
  }, [city, refetchC, refetchF]);

  return (
    <>
      <GlobalContext.Provider value={{city, setCity}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <DataCurrentContext.Provider value={{dataC, isLoadingC, refetchC}}>
                  <MainWeather />
                </DataCurrentContext.Provider>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <DataForecastContext.Provider value={{dataF, isLoadingF, refetchF}}>
                  <ForecastWeather city={city} />
                </DataForecastContext.Provider>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <Charts />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Locations />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </GlobalContext.Provider>
    </>
  );
};
