import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "a79aad9743859b7143100ca7247efd7c";

const isValid = (arg, targetHour) => {
  const dt = arg;
  const date = new Date(dt * 1000);

  const hour = date.getHours() + 1;
  // console.log(hour + ' ' + (hour === 15));
  return hour === targetHour;
};

export const ForecastWeather = (props) => {
  const units = "metric";
  const queryComposed = `${URL}?appid=${API_KEY}&units=${units}&q=${props.city}`;

  const getData = async () => {
    const data = await Axios.get(queryComposed).then((res) => res.data);
    const filteredData = data.list.filter((d) => isValid(d.dt, 15));
    console.log(filteredData);
    return filteredData;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["forecast"],
    queryFn: getData,
  });

  useEffect(() => {
    refetch();
    console.log("done forecast");
  }, [props.city, refetch]);

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  const getDate = (arg) => {
    const dt = arg.dt;
    const date = new Date(dt * 1000);
    const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
    const monthName = dateFormatter.format(date);

    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");

    return day + " " + monthName + " " + year;
  };

  const getTime = (arg) => {
    const dt = arg.dt;
    const date = new Date(dt * 1000);

    const hour = (date.getHours() + 1).toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return hour + ":" + minute;
  };

  const getTemp = (arg) => {
    const temp = Math.round(arg.main.temp) + String.fromCharCode(176) + "C";
    return temp;
  };

  const getWeekDay = (arg) => {
    const dt = arg;
    const date = new Date(dt * 1000);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    const today = new Date();

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDay() === today.getDay();
    return isToday ? "Today" : dayOfWeek;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, minHeight: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Forecast</b>
            </TableCell>
            <TableCell align="right">
              <b>Temperature</b>
            </TableCell>
            <TableCell align="right">
              <b>Description</b>
            </TableCell>
            <TableCell align="right">
              <b>Wind</b>
            </TableCell>
            <TableCell align="right">
              <b>Humidity</b>
            </TableCell>
            <TableCell align="right">
              <b>Pressure</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.dt}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <>{getWeekDay(row.dt)}</>
              </TableCell>
              <TableCell align="right" className="icon-temp-container">
                <img
                  src={`https://openweathermap.org/img/wn/${row.weather[0].icon}.png`}
                  alt="Icon"
                />
                {getTemp(row)}
              </TableCell>
              <TableCell align="right">{row.weather[0].main}</TableCell>
              <TableCell align="right">
                {(row.wind.speed * 3.6).toFixed(1)} km/h
              </TableCell>
              <TableCell align="right">{row.main.humidity}%</TableCell>
              <TableCell align="right">{row.main.pressure} hPa</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
