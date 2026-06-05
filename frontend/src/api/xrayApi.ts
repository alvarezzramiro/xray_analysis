import api from "./axios";

export const getMyXrays = async () => {

    const response =
        await api.get("/xray/my");

    return response.data;
};

export const uploadXray =
    async (
        file: File
    ) => {

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        const response =
            await api.post(
                "/xray/upload",
                formData
            );

        return response.data;
    };

