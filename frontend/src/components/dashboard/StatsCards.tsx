import type { DashboardData }
    from "../../types/Dashboard";

interface Props {

    dashboard: DashboardData;
}

export default function StatsCards(
    { dashboard }: Props
) {

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(4, 1fr)",
                gap: "1rem",
            }}
        >

            <div>
                <h3>X-Rays</h3>
                <p>{dashboard.total_xrays}</p>
            </div>

            <div>
                <h3>Analyses</h3>
                <p>{dashboard.total_analyses}</p>
            </div>

            <div>
                <h3>Feedbacks</h3>
                <p>{dashboard.total_feedbacks}</p>
            </div>

            <div>
                <h3>Agreement</h3>
                <p>
                    {dashboard.estimated_accuracy}%
                </p>
            </div>

        </div>
    );
}