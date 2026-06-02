// src/pages/RegisterPage.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerRequest } from "../api/authApi";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [username, setUsername] =
        useState("");

    const [fullName, setFullName] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");

        try {

            await registerRequest(
                email,
                username,
                password,
                fullName
            );

            alert(
                "User created successfully"
            );

            navigate("/login");

        } catch (err: any) {

            setError(
                err?.response?.data?.detail ??
                "Registration failed"
            );
        }
    };

    return (

        <div>

            <h1>
                Register
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                />

                <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) =>
                        setFullName(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button type="submit">
                    Register
                </button>

                <p>
                    Already have an account?
                    {" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

            {
                error && (
                    <p>
                        {error}
                    </p>
                )
            }

        </div>
    );
}