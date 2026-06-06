import {
    useEffect,
    useState
} from "react";

import {
    fetchAnalysisFeedback,
    createFeedback
} from "../../services/feedbackService";
import MainLayout from "../../layouts/MainLayout";

type Props = {

    analysisId: string;
};

export default function AnalysisFeedbackPanel({
    analysisId
}: Props) {

    const [
        feedback,
        setFeedback
    ] = useState<any>(null);

    const [
        showIncorrectFlow,
        setShowIncorrectFlow
    ] = useState(false);

    const [
        showTypeSelection,
        setShowTypeSelection
    ] = useState(false);

    const [
        comment,
        setComment
    ] = useState("");

    const [
        selectedType,
        setSelectedType
    ] = useState("");

    useEffect(() => {

        loadFeedback();

    }, []);

    const loadFeedback =
        async () => {

            try {

                const data =
                    await fetchAnalysisFeedback(
                        analysisId
                    );

                setFeedback(data);

            } catch {

                setFeedback(null);
            }
        };

    const handleCorrect =
        async () => {

            await createFeedback({

                analysis_id:
                    analysisId,

                feedback_type:
                    "correct",

                comment:
                    null,

                annotations:
                    []
            });

            loadFeedback();
        };

    const handleSaveFeedback =
        async () => {

            await createFeedback({

                analysis_id:
                    analysisId,

                feedback_type:
                    selectedType,

                comment,

                annotations:
                    []
            });

            loadFeedback();
        };

    /*
        Feedback ya enviado
    */

    if (feedback) {

        return (

            <div>

                <h3>
                    Feedback Submitted
                </h3>

                <p>
                    Type:
                    {" "}
                    {feedback.feedback_type}
                </p>

            </div>
        );
    }

    /*
        Selección de tipo de error
    */

    if (showTypeSelection) {

        return (

            <div>

                <h3>
                    Select Error Type
                </h3>

                <label>

                    <input
                        type="radio"
                        value="false_positive"
                        checked={
                            selectedType ===
                            "false_positive"
                        }
                        onChange={(e) =>
                            setSelectedType(
                                e.target.value
                            )
                        }
                    />

                    False Positive

                </label>

                <br />

                <label>

                    <input
                        type="radio"
                        value="false_negative"
                        checked={
                            selectedType ===
                            "false_negative"
                        }
                        onChange={(e) =>
                            setSelectedType(
                                e.target.value
                            )
                        }
                    />

                    False Negative

                </label>

                <br />

                <label>

                    <input
                        type="radio"
                        value="other"
                        checked={
                            selectedType ===
                            "other"
                        }
                        onChange={(e) =>
                            setSelectedType(
                                e.target.value
                            )
                        }
                    />

                    Other

                </label>

                <br />
                <br />

                <button
                    onClick={
                        handleSaveFeedback
                    }
                    disabled={
                        !selectedType
                    }
                >

                    Save Feedback

                </button>

            </div>
        );
    }

    /*
        Flujo incorrecto
    */

    if (showIncorrectFlow) {

        return (

            <div>

                <h3>
                    Incorrect Analysis
                </h3>

                <div
                    style={{
                        border:
                            "1px dashed gray",
                        padding: "2rem",
                        marginBottom:
                            "1rem"
                    }}
                >

                    Bounding Box Editor
                    <br />
                    (Coming Soon)

                </div>

                <textarea
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) =>
                        setComment(
                            e.target.value
                        )
                    }
                />

                <br />
                <br />

                <button
                    onClick={() =>
                        setShowTypeSelection(
                            true
                        )
                    }
                >

                    Continue

                </button>

            </div>
        );
    }

    /*
        Pantalla inicial
    */

    return (

        <MainLayout>
            <div>

                <h3>

                    Was this analysis
                    correct?

                </h3>

                <button
                    onClick={
                        handleCorrect
                    }
                >

                    Correct

                </button>

                <button
                    onClick={() =>
                        setShowIncorrectFlow(
                            true
                        )
                    }
                >

                    Incorrect

                </button>

            </div>
            
        </MainLayout>
    );
}