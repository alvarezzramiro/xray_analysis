import type { Analysis }
    from "../../types/Analysis";

interface Props {

    analyses: Analysis[];
}

export default function RecentAnalyses(
    { analyses }: Props
) {

    return (

        <div>

            <h2>
                Recent Analyses
            </h2>

            {

                analyses.map(
                    analysis => (

                        <div
                            key={analysis.id}
                        >

                            {

                                analysis.fracture_detected

                                    ? "Fracture detected"

                                    : "No fracture"

                            }

                        </div>
                    )
                )
            }

        </div>
    );
}