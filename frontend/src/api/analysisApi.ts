import api from "./axios";

export const getMyAnalyses =
    async () => {

        const response =
            await api.get(
                "/analysis/my"
            );

        return response.data;
    };