import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MainWeather } from "./MainWeather";
import { ForecastWeather } from "./ForecastWeather";
import { Button } from "@mui/material";
import { useState } from "react";
import { ChartsBody } from "./charts/ChartsBody";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const WeatherLayout = () => {
  const [city, setCity] = useState("warsaw");
  const [text, setText] = useState("");

  const submitCity = () => {
    setCity(text);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <MainWeather city={city} />
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
              <ChartsBody />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
