import api from "./axios";

export const analyzeXray =
    async (
        imageId: string
    ) => {

        const response =
            await api.post(
                `/analysis/${imageId}`
            );

        return response.data;
    };

export const getMyAnalyses =
    async () => {

        const response =
            await api.get(
                "/analysis/my"
            );

        return response.data;
    };