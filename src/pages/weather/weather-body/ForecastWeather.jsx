import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useContext} from "react";
import {DataForecastContext} from "./WeatherBody.jsx";
import Typography from "@mui/material/Typography";

export const ForecastWeather = () => {
    const {filteredData: data, isLoadingF: isLoading} = useContext(DataForecastContext);

    if (isLoading) {
        return <h1>Loading..</h1>;
    }

    const getDate = (arg) => {
        const dt = arg.dt;
        const date = new Date(dt * 1000);
        const dateFormatter = new Intl.DateTimeFormat("en-US", {month: "long"});
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
        const dayOfWeek = date.toLocaleDateString("en-US", {weekday: "long"});

        const today = new Date();

        const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDay() === today.getDay();
        return isToday ? "Today" : dayOfWeek;
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650, minHeight: 500}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                <b>Forecast</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                <b>Temperature</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                <b>Description</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                <b>Wind</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                <b>Humidity</b>
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                <b>Pressure</b>
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => (
                        <TableRow
                            key={row.dt}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <Typography>{getWeekDay(row.dt)}</Typography>
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
