import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { DataCurrentContext } from "./WeatherBody";

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
    const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
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
    <Card sx={{ minWidth: 275, minHeight: 500 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {getName()}
        </Typography>
        <Typography variant="h5" component="div">
          {getTemp()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data?.weather[0].main}
        </Typography>
        <Typography variant="body2">
          {getDate()}
          <br />
          {getTime()}
        </Typography>
      </CardContent>
    </Card>
  );
};
