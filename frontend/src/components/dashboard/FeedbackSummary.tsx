import type { DashboardData }
    from "../../types/Dashboard";

interface Props {

    dashboard: DashboardData;
}

export default function FeedbackSummary(
    { dashboard }: Props
) {

    return (

        <div>

            <h2>
                Feedback Summary
            </h2>

            <p>
                Correct:
                {" "}
                {dashboard.correct_feedbacks}
            </p>

            <p>
                False Positive:
                {" "}
                {dashboard.false_positive_feedbacks}
            </p>

            <p>
                False Negative:
                {" "}
                {dashboard.false_negative_feedbacks}
            </p>

            <p>
                Other:
                {" "}
                {dashboard.other_feedbacks}
            </p>

        </div>
    );
}