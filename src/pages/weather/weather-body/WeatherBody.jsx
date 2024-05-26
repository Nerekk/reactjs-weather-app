import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MainWeather } from "./MainWeather";
import { ForecastWeather } from "./ForecastWeather";
import { Button } from "@mui/material";
import { createContext, useState } from "react";
import { Charts } from "./charts/Charts";
import { Locations } from "./locations/Locations";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const DataContext = createContext();

export const WeatherLayout = () => {
  const [city, setCity] = useState("warsaw");
  const [text, setText] = useState("");

  const submitCity = () => {
    setCity(text);
  };

  return (
    <>
      <DataContext.Provider value={{city, setCity}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <MainWeather />
                <input
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <Button onClick={submitCity}>Search</Button>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <ForecastWeather city={city} />
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
      </DataContext.Provider>
    </>
  );
};
