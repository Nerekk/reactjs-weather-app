import Typography from "@mui/material/Typography";
import {useContext} from "react";
import {DataCurrentContext} from "./WeatherBody";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const MainWeather = () => {
    const {dataC: data, isLoadingC: isLoading} = useContext(DataCurrentContext);

    if (!data) {
        return null;
    }

    if (isLoading) {
        return <h1>Loading..</h1>;
    }

    const getName = () => {
        return data.name;
    };

    const getDate = () => {
        const dt = data.dt;
        const date = new Date(dt * 1000);
        const dateFormatter = new Intl.DateTimeFormat("en-US", {month: "long"});
        const monthName = dateFormatter.format(date);

        const year = date.getFullYear();
        const day = date.getDate().toString().padStart(2, "0");

        return day + " " + monthName + " " + year;
    };

    const getTime = () => {
        const dt = data.dt;
        const date = new Date(dt * 1000);

        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        return hour + ":" + minute;
    };

    const getTemp = (tempToFormat) => {
        const temp = Math.round(tempToFormat) + String.fromCharCode(176) + "C";
        return temp;
    };

    const getCoords = (lon, lat) => {
        const latDirection = lat >= 0 ? 'N' : 'S';
        const lonDirection = lon >= 0 ? 'E' : 'W';
        const formattedLat = Math.abs(lat).toFixed(2);
        const formattedLon = Math.abs(lon).toFixed(2);

        return `${formattedLat}${latDirection} ${formattedLon}${lonDirection}`;
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={1} sx={{pt: 3}}>
            <Grid item xs={6}>
                <Typography variant={'h4'}>{getName()}</Typography>
                <Typography variant={'subtitle1'}>{getCoords(data?.coord.lon, data?.coord.lat)}</Typography>
                <Typography variant={'h3'}>{getTemp(data?.main.temp)}</Typography>
                <Typography variant={'h6'}>{getDate()}
                    <br/>
                    {getTime()}</Typography>
            </Grid>
            <Grid item xs={6}>
                <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
                     style={{margin: '-40px'}}/>
                <Typography variant={'h4'}>{data?.weather[0].main}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Item>
                    <Typography>Wind speed: {(data?.wind.speed * 3.6).toFixed(1)} km/h</Typography>
                    <Typography>Humidity: {data?.main.humidity} %</Typography>
                    <Typography>Pressure: {data?.main.pressure} hPa</Typography>
                    <Typography>Feels like: {getTemp(data?.main.feels_like)}</Typography>
                    <Typography>Maximal: {getTemp(data?.main.temp_max)}</Typography>
                    <Typography>Minimal: {getTemp(data?.main.temp_min)}</Typography>
                </Item>
            </Grid>
            <Grid item xs={6}>
                <Item>4</Item>
            </Grid>
        </Grid>
    );
};
