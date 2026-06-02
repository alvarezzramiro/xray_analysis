import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await login(
                email,
                password
            );

            navigate("/dashboard");

        } catch (error: any) {
            console.log(error);
            console.log(error.response);

            alert(
                JSON.stringify(
                    error.response?.data ??
                    error.message
                )
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button type="submit">
                Login
            </button>

            <p>
                Don't have an account?
                {" "}
                <Link to="/register">
                    Register
                </Link>
            </p>
        </form>
    );
}