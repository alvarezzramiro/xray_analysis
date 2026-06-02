import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function AdminRoute({
    children
}: {
    children: React.ReactNode;
}) {

    const {
        loading,
        user
    } = useAuth();

    if (loading) {

        return <p>Loading...</p>;
    }

    if (
        user?.role !== "admin"
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
}