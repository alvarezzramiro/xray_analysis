import { useAuth } from "../hooks/useAuth";

export default function Topbar() {
    const { user } = useAuth();

    return (
        <header
            style={{
                height: "70px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2rem",
            }}
        >
            <div>
                Welcome {user?.username}
            </div>
        </header>
    );
}