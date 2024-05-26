import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {ChartTemp} from "./ChartTemp";
import {ChartHum} from "./ChartHum";
import {ChartPressure} from "./ChartPressure";
import {ChartWind} from "./ChartWind";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export const Charts = () => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item xs={6}>
                <Item><ChartTemp/></Item>
            </Grid>
            <Grid item xs={6}>
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
