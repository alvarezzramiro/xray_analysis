import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

export default function DashboardPage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const {
        user,
        logout
    } = useAuth();

    const goToAdmin = () => {
        navigate("/admin");
    };

    return (

        <div>

            <h1>
                Dashboard
            </h1>

            <p>
                Welcome {user?.fullName || user?.username}
            </p>

            <p>
                Role: {user?.role}
            </p>

            {
                user?.role === "admin" && (

                    <button
                        onClick={goToAdmin}
                    >
                        Admin Panel
                    </button>

                )
            }

            <button
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>

    );
}