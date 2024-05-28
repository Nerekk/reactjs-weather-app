import "./App.css";
import {WeatherPage} from "./pages/weather/WeatherPage";
import {LoginPage} from "./pages/login/LoginPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    return (
        <>
            <div>
                <BrowserRouter>
                    <QueryClientProvider client={client}>
                        <Routes>
                            <Route path={'/'} element={<LoginPage/>}/>
                            <Route path={'/weather'} element={<WeatherPage/>}/>
                        </Routes>
                    </QueryClientProvider>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
