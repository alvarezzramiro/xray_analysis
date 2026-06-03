import api from "./axios";

export const getMyXrays = async () => {

    const response =
        await api.get("/xray/my");

    return response.data;
};