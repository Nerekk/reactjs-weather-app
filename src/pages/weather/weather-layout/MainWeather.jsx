import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "a79aad9743859b7143100ca7247efd7c";

export const MainWeather = () => {
  const [city, setCity] = useState('warsaw');
  const units = "metric";
  const queryComposed = `${URL}?appid=${API_KEY}&units=${units}&q=${city}`;

  const getData = () => {
    return Axios.get(queryComposed).then((res) => res.data);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["current"],
    queryFn: getData,
  });

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  const getName = () => {
    return data.name;
  }

  const getDate = () => {
    const dt = data.dt;
    const date = new Date(dt * 1000);
    const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
    const monthName = dateFormatter.format(date);

    const year = date.getFullYear();
    const day = date.getDate();

    return day + ' ' + monthName + ' ' + year;
  };

  const getTime = () => {
    const dt = data.dt;
    const date = new Date(dt * 1000);
    
    const hour = date.getHours();
    const minute = date.getMinutes();
    return hour + ':' + minute;
  }

  const getTemp = () => {
    const temp = Math.round(data.main.temp) + String.fromCharCode(176) + 'C';
    return temp;
  }

  return (
    <Card sx={{ minWidth: 275, height: 320 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {data?.name}
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
