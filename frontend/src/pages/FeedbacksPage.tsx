import {
    useEffect,
    useState
} from "react";

import type {
    Feedback
} from "../types/Feedback";

import {
    fetchMyFeedbacks
} from "../services/feedbackService";

import MainLayout
    from "../layouts/MainLayout";

export default function MyFeedbacksPage() {

    const [
        feedbacks,
        setFeedbacks
    ] = useState<Feedback[]>([]);

    useEffect(() => {

        loadFeedbacks();

    }, []);

    const loadFeedbacks =
        async () => {

            const data =
                await fetchMyFeedbacks();

            setFeedbacks(data);
        };

    return (

        <MainLayout>

            <h1>
                My Feedbacks
            </h1>

            {
                feedbacks.map(
                    feedback => (

                        <div
                            key={feedback.id}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    gap: "2rem",
                                    marginTop: "1rem",
                                    marginBottom: "1rem"
                                }}
                            >

                                <div>

                                    <h4>
                                        AI Analysis
                                    </h4>

                                    {
                                        feedback.analysis_image_url
                                        && (
                                            <img
                                                src={
                                                    feedback.analysis_image_url
                                                }
                                                alt="Analysis"
                                                width={250}
                                            />
                                        )
                                    }

                                </div>

                                <div>

                                    <h4>
                                        User Correction
                                    </h4>

                                    <div
                                        style={{
                                            width: "250px",
                                            height: "250px",
                                            border: "1px dashed gray",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >

                                        Future feature

                                    </div>

                                </div>

                            </div>
                            
                            <p>
                                Type:
                                {" "}
                                {feedback.feedback_type}
                            </p>

                            <p>
                                Analysis:
                                {" "}
                                {feedback.analysis_id}
                            </p>

                            <p>
                                Comment:
                                {" "}
                                {
                                    feedback.comment
                                    || "-"
                                }
                            </p>

                            <p>
                                Created at:
                                {" "}
                                {new Date(feedback.created_at).toLocaleString()}
                            </p>

                            <p>
                                
                            </p>

                        </div>
                    )
                )
            }

        </MainLayout>
    );
}