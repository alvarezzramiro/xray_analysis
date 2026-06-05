import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    fetchAnalysis
} from "../services/analysisService";

import type {
    Analysis
} from "../types/Analysis";

export default function AnalysisDetailPage() {
    const [analysis, setAnalysis] =
        useState<Analysis | null>(null);

    const {
        analysisId
    } = useParams();

    useEffect(() => {
        loadAnalysis();
    }, []);

    const loadAnalysis =
        async () => {
            if (!analysisId) return;

            const data =
                await fetchAnalysis(
                    analysisId
                );
            setAnalysis(data);
        };

    if (!analysis) {
        return <p>Loading...</p>;
    }

    return (

        <div>

            <h1>
                Analysis Detail
            </h1>

            <p>
                Model:
                {analysis.model_version}
            </p>

            <p>
                Fracture:
                {
                    analysis.fracture_detected
                        ? " YES"
                        : " NO"
                }
            </p>

            <p>
                Confidence:
                {analysis.max_confidence}
            </p>

            <p>
                Detections:
                {analysis.detections_count}
            </p>

            <p>
                Processing:
                {analysis.processing_time_ms} ms
            </p>

            {
                analysis.original_image_url &&
                (
                    <img
                        src={analysis.original_image_url                        }
                        alt="Original"
                        width={400}
                    />
                )
            }

            {
                analysis.annotated_image_url &&
                (
                    <img
                        src={analysis.annotated_image_url}
                        alt="Annotated"
                        width={400}
                    />
                )
            }

            <h2>Detections</h2>

            {
                analysis.detections.map(
                    (
                        detection,
                        index
                    ) => (

                        <div key={index}>

                            <p>
                                Class:
                                {detection.class_name}
                            </p>

                            <p>
                                Confidence:
                                {detection.confidence}
                            </p>

                        </div>
                    )
                )
            }

        </div>
    );

}