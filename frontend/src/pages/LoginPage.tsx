import { useState } from "react";
import { login } from "../services/AuthService";

export default function LoginPage() {

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

            alert("Login successful");

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
        </form>
    );
}