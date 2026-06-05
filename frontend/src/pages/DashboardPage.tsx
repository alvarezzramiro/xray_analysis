import {
    useEffect,
    useState
} from "react";

import type {
    DashboardData
} from "../types/Dashboard";

import {
    fetchDashboardData
} from "../services/dashboardService";

import StatsCards
    from "../components/dashboard/StatsCards";

import FeedbackSummary
    from "../components/dashboard/FeedbackSummary";

// import QuickActions from "../components/dashboard/QuickActions";
import type { Analysis } from "../types/Analysis";
import type { XRay } from "../types/Xray";
import { fetchMyXrays } from "../services/xrayService";
import { fetchMyAnalyses } from "../services/analysisService";
import RecentUploads from "../components/dashboard/RecentUploads";
import RecentAnalyses from "../components/dashboard/RecentAnalysis";
import MainLayout from "../layouts/MainLayout";

export default function DashboardPage() {

    const [
        dashboard,
        setDashboard
    ] = useState<
        DashboardData | null
    >(null);

    const [xrays, setXrays] =
    useState<XRay[]>([]);

    const [analyses, setAnalyses] =
    useState<Analysis[]>([]);

    useEffect(() => {

        const loadDashboard =
            async () => {

                const dashboardData =
                    await fetchDashboardData();

                const xraysData =
                    await fetchMyXrays();

                const analysesData =
                    await fetchMyAnalyses();

                setDashboard(dashboardData);
                setXrays(xraysData.slice(0, 5));
                setAnalyses(analysesData.slice(0, 5));
            };

        loadDashboard();

    }, []);

    if (!dashboard) {

        return <p>Loading...</p>;
    }

    return (
        <MainLayout>
            <div>

                <h1>
                    Dashboard
                </h1>

                <StatsCards
                    dashboard={dashboard}
                />

                <FeedbackSummary
                    dashboard={dashboard}
                />

                <RecentUploads
                    xrays={xrays}
                />

                <RecentAnalyses
                    analyses={analyses}
                />

            </div>
        </MainLayout>
    );
}