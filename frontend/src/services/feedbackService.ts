import {
    getMyFeedbacks,
    getAnalysisFeedback,
    createFeedbackRequest
} from "../api/feedbackApi";

export const fetchMyFeedbacks =
    async () => {

        return await getMyFeedbacks();
    };

export const fetchAnalysisFeedback =
    async (
        analysisId: string
    ) => {

        return await getAnalysisFeedback(
            analysisId
        );
    };

export const createFeedback =
    async (
        feedbackData: {

            analysis_id: string;

            feedback_type: string;

            comment: string | null;

            annotations: any[];
        }
    ) => {

        return await createFeedbackRequest(
            feedbackData
        );
    };