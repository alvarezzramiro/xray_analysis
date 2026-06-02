import { loginRequest } from "../api/authApi";

export const login = async (
    email: string,
    password: string
) => {

    const data = await loginRequest(
        email,
        password
    );

    localStorage.setItem(
        "token",
        data.access_token
    );

    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

