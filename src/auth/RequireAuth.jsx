import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "./useAuth.js";
import {useEffect, useState} from "react";
import Axios from "axios";

const USER_INFO_URL = "http://localhost:8080/api/user/info";

const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem('JWT');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (token && !auth) {
                try {
                    const response = await Axios.get(USER_INFO_URL, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    });

                    const userInfo = response.data;

                    // tu zwraca poprawny obiekt
                    console.log(userInfo);

                    setAuth({
                        username: userInfo.email,
                        token: token,
                        role: userInfo.role,
                        locations: userInfo.locations,
                    });

                } catch (error) {
                    console.error("Failed to fetch user info:", error);
                    localStorage.removeItem('JWT');
                    setAuth(null);
                }
            }
            setIsLoading(false);
        };

        fetchUserInfo();
    }, [token, auth, setAuth]);

    useEffect(() => {
        console.log("Auth state updated:", auth);
    }, [auth]);

    if (isLoading) {
        return <div>Loading...</div>; // Wyświetl coś w trakcie ładowania
    }


    return (
        auth ? <Outlet /> : <Navigate to={"/"} state={{from: location}} replace/>
    );
}

export default RequireAuth;