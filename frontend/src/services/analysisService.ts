import { getMyAnalyses }
    from "../api/analysisApi";

export const fetchMyAnalyses =
    async () => {

        return await getMyAnalyses();
    };