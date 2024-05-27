import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useContext} from "react";
import {DataCurrentContext} from "./WeatherBody";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
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

    const getTemp = () => {
        const temp = Math.round(data.main.temp) + String.fromCharCode(176) + "C";
        return temp;
    };

    return (
        <Grid container rowSpacing={1} columnSpacing={1} sx={{ pt: 3 }}>
            <Grid item xs={6}>
                <Typography variant={'h4'}>{getName()}</Typography>
                <Typography variant={'h3'}>{getTemp()}</Typography>
                <Typography variant={'h6'}>{getDate()}
                    <br/>
                    {getTime()}</Typography>
            </Grid>
            <Grid item xs={6}>
                <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
                     style={{ margin: '-40px' }}/>
                <Typography variant={'h4'}>{data?.weather[0].main}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Item>3</Item>
            </Grid>
            <Grid item xs={6}>
                <Item>4</Item>
            </Grid>
        </Grid>
    );
};
