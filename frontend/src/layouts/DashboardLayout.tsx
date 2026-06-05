import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
            }}
        >

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Topbar />

                <main
                    style={{
                        padding: "2rem",
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}