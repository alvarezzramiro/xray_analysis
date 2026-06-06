import api from "./axios";

export const getMyFeedbacks =
    async () => {

        const response =
            await api.get(
                "/feedback/my"
            );

        return response.data;
    };

export const getAnalysisFeedback =
    async (
        analysisId: string
    ) => {

        const response =
            await api.get(
                `/feedback/analysis/${analysisId}`
            );

        return response.data;
    };

export const createFeedbackRequest =
    async (
        feedbackData: {

            analysis_id: string;

            feedback_type: string;

            comment: string | null;

            annotations: any[];
        }
    ) => {

        const response =
            await api.post(
                "/feedback",
                feedbackData
            );

        return response.data;
    };