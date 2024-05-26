import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {ChartHum} from "./ChartHum";
import {ChartPressure} from "./ChartPressure";
import {ChartWind} from "./ChartWind";
import {ChartTemp} from "./ChartTemp.jsx";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export const getWeekDayChart = (date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", {weekday: "long"});

    const today = new Date();

    const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDay() === today.getDay();
    return isToday ? "Today" : dayOfWeek;
};

export const getHourChart = (date) => {
    return `${date.getHours()}:00`;
};

export const Charts = () => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={8}>
                <Typography>Temperature</Typography>
                <Item><ChartTemp /></Item>
            </Grid>
            <Grid item xs={4}>
                <Item><ChartHum/></Item>
            </Grid>
            <Grid item xs={6}>
                <Item><ChartPressure/></Item>
            </Grid>
            <Grid item xs={6}>
                <Item><ChartWind/></Item>
            </Grid>
        </Grid>
    );
};
