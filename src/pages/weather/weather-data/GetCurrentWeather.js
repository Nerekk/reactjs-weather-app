import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "a79aad9743859b7143100ca7247efd7c";

export const GetCurrentWeather = (props) => {
  const queryComposed = `${URL}?appid=${API_KEY}&${props.text}`;
  const { data } = useQuery(["current"], () => {
    return Axios.get(queryComposed).then((res) => res.data);
  });
};
