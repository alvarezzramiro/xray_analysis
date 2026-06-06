import { useState, useEffect } from "react";
import type { XRay } from "../types/Xray";
import { fetchMyXrays, uploadXrayFile } from "../services/xrayService";
import { runAnalysis } from "../services/analysisService";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function MyXraysPage() {

    const navigate = useNavigate();
    
    const [xrays, setXrays] =
        useState<XRay[]>([]);

    const [file, setFile] =
        useState<File | null>(
        null
    );

    const [loading, setLoading] =
        useState(false);

    const loadXrays =
        async () => {

            try {

                const data =
                    await fetchMyXrays();

                setXrays(data);

            } catch (error) {

                console.error(error);
            }
        };

    useEffect(() => {
        loadXrays();
    }, []);

    const handleUpload =
        async () => {

            if (!file) return;

            try {

                setLoading(true);

                await uploadXrayFile(
                    file
                );

                setFile(null);

                await loadXrays();

            } catch (error) {

                console.error(
                    "Upload error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

    const handleAnalyze =
        async (
            imageId: string
        ) => {

            try {

                const analysis =
                    await runAnalysis(imageId);

                alert("Analysis completed");

                await loadXrays();

                navigate(
                    `/analysis/${analysis.id}`
                );

            } catch (error) {

                console.error(error);
            }
        };

    return (
        
        <MainLayout>
        
            <div>

                <h1>
                    My X-Rays
                </h1>

                <div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />

                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                    >
                        {loading ? "Uploading..." : "Upload X-Ray"}
                    </button>

                </div>

                <hr />

                <h2>
                    Uploaded X-Rays
                </h2>

                {

                    xrays.length === 0

                        ? (

                            <p>
                                No X-Rays uploaded yet.
                            </p>
                        )

                        : (

                            xrays.map(
                                (xray) => (

                                    <div
                                        key={xray.id}
                                    >

                                        <img
                                            src={xray.image_url}
                                            alt={xray.filename}
                                            width={250}
                                        />
                                        
                                        <h3>
                                            {xray.filename}
                                        </h3>

                                        <p>
                                            Status:
                                            {" "}
                                            {xray.status}
                                        </p>

                                        <p>
                                            Uploaded:
                                            {" "}
                                            {
                                                new Date(
                                                    xray.created_at
                                                ).toLocaleString()
                                            }
                                        </p>

                                        <p>
                                            Analyses: {xray.analysis_count}
                                        </p>
                                        
                                        {
                                            xray.analysis_count > 0

                                            ? (
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/analysis/${xray.latest_analysis_id}`
                                                        )
                                                    }
                                                >
                                                    View Analysis
                                                </button>
                                                
                                                /*
                                                tiene feedback?
                                                
                                                ? (
                                                    <button>
                                                        View Feedback
                                                    </button>
                                                )
                                                : (
                                                    <button>
                                                        Provide Feedback
                                                    </button>
                                                )
                                                */
                                            )

                                            : (

                                                <button
                                                    onClick={() =>
                                                        handleAnalyze(
                                                            xray.id
                                                        )
                                                    }
                                                >
                                                    Analyze
                                                </button>
                                            )
                                        }

                                    </div>
                                )
                            )

                        )

                }

            </div>
            
        </MainLayout>
    );
}