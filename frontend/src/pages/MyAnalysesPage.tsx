import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyAnalyses } from "../services/analysisService";
import type { Analysis } from "../types/Analysis";
import MainLayout from "../layouts/MainLayout";

export default function MyAnalysesPage() {
    const [
        analyses,
        setAnalyses
    ] = useState<Analysis[]>([]);

    useEffect(() => {
        loadAnalyses();
    }, []);

    const navigate = useNavigate();

    const loadAnalyses =
        async () => {

            const data =
                await fetchMyAnalyses();

            setAnalyses(data);
        };

    return (

        <MainLayout>

            <div>

                <h1>
                    My Analyses
                </h1>

                {
                    analyses.map(
                        analysis => (

                            <div
                                key={analysis.id}
                            >

                                <img
                                    src={analysis.annotated_image_url}
                                    alt={analysis.id}
                                    width={250}
                                />
                                
                                <p>
                                    Version:
                                    {analysis.model_version}
                                </p>

                                <p>
                                    Max confidence: 
                                    {analysis.max_confidence}
                                </p>

                                <p>
                                    Fracture detected:
                                    {
                                        analysis.fracture_detected
                                            ? " Yes"
                                            : " No"
                                    }
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/analysis/${analysis.id}`
                                        )
                                    }
                                >
                                    View analysis
                                </button>

                            </div>
                        )
                    )
                }

            </div>
        </MainLayout>
    );
}