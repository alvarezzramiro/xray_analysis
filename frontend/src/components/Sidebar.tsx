import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
    const { user } = useAuth();
    const {logout} = useAuth();
    return (
        <aside
            style={{
                width: "220px",
                borderRight: "1px solid #ddd",
                padding: "1rem",
            }}
        >
            <h2>XRay AI</h2>

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "2rem",
                }}
            >
                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/xrays">
                    My X-Rays
                </Link>

                <Link to="/analyses">
                    My Analyses
                </Link>

                <Link to="/feedback">
                    Feedback
                </Link>

                {
                    user?.role === "admin" && (
                        <Link to="/admin">
                            Admin Panel
                        </Link>
                    )
                }
                
                <button
                    onClick={logout}
                >
                    Logout
                </button>
                
            </nav>
        </aside>
    );
}