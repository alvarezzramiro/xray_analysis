import {
    analyzeXray,
    getMyAnalyses
} from "../api/analysisApi";

export const runAnalysis =
    async (
        imageId: string
    ) => {

        return await analyzeXray(
            imageId
        );
    };

export const fetchMyAnalyses =
    async () => {

        return await getMyAnalyses();
    };