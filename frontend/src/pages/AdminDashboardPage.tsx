import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";

export default function AdminDashboard() {

    const { user } = useAuth();

    return (
        <MainLayout>

            <div>

                <h1>
                    Admin Dashboard
                </h1>

                <p>
                    Welcome Admin: {user?.fullName || user?.username}
                </p>
            </div>
        </MainLayout>
    );
}