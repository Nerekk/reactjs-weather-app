import "./App.css";
import {WeatherPage} from "./pages/weather/WeatherPage";
import {LoginPage} from "./pages/login/LoginPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ErrorPage} from "./pages/error/ErrorPage.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import {ProfilePage} from "./pages/profile/ProfilePage.jsx";
import {AdminPage} from "./pages/admin/AdminPage.jsx";

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
                            <Route element={<RequireAuth />}>
                                <Route path={'/weather'} element={<WeatherPage/>}/>
                                <Route path={'/profile'} element={<ProfilePage/>}/>
                                <Route path={'/admin'} element={<AdminPage/>}/>
                            </Route>
                            <Route path={"/error"} element={<ErrorPage />} />
                        </Routes>
                    </QueryClientProvider>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
