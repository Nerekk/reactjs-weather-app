import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const MainWeather = () => {
  const [apiData, setApiData] = useState({});

  return (
    <Card sx={{ minWidth: 275, height: 320 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          City
        </Typography>
        <Typography variant="h5" component="div">
          20C
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Cloudy
        </Typography>
        <Typography variant="body2">
          24 may 2024
          <br />
          20:00
        </Typography>
      </CardContent>
    </Card>
  );
}
