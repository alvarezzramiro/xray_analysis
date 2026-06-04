import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function AdminDashboard() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (

        <div>

            <h1>
                Admin Dashboard
            </h1>

            <p>
                Welcome {user?.fullName || user?.username}
            </p>

            <button
                onClick={goToDashboard}
            >
                Dashboard
            </button>
        </div>

    );
}