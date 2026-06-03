import { useNavigate }
    from "react-router-dom";

export default function QuickActions() {

    const navigate =
        useNavigate();

    return (

        <div>

            <h2>
                Quick Actions
            </h2>

            <button
                onClick={() =>
                    navigate("/xrays")
                }
            >
                My X-Rays
            </button>

            <button
                onClick={() =>
                    navigate("/analyses")
                }
            >
                Analyses
            </button>

            <button
                onClick={() =>
                    navigate("/feedback")
                }
            >
                Feedback
            </button>

        </div>
    );
}