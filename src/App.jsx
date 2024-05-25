import "./App.css";
import { WeatherLayout } from "./pages/weather/weather-layout/WeatherLayout.jsx";
import { WeatherPage } from "./pages/weather/WeatherPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient({defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }});
  return (
    <>
      <div>
        <QueryClientProvider client={client}>
          <WeatherPage />
        </QueryClientProvider>
        <WeatherLayout />
      </div>
    </>
  );
}

export default App;
