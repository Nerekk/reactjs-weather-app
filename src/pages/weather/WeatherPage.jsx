import {WeatherAppBar} from "./weather-appbar/WeatherAppbar";
import {WeatherLayout} from "./weather-body/WeatherBody.jsx";

export const WeatherPage = () => {
    return (
    <div>
        <WeatherAppBar />
        <WeatherLayout/>
    </div>);
}