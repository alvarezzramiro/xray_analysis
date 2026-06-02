import api from "./axios";

export const loginRequest = async (
    email: string,
    password: string
) => {

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data;
};

export const registerRequest = async (
    email: string,
    username: string,
    password: string,
    fullName?: string
) => {
    const response = await api.post(
        "/auth/register",
        {
            email,
            username,
            password,
            fullName: fullName
        }
    );

    return response.data;
}

export const getCurrentUserRequest = async () => {
    const response = await api.get("/user/me");
    return response.data;
};