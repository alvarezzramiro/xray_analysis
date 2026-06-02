import {
    createContext,
    useEffect,
    useState
} from "react";

import type { User } from "../types/User";

import {
    loginRequest,
    getCurrentUserRequest
} from "../api/authApi";

interface AuthContextType {

    user: User | null;

    loading: boolean;

    isAuthenticated: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    logout: () => void;
}

export const AuthContext =
    createContext<
        AuthContextType | undefined
    >(undefined);

export function AuthProvider({
    children
}: {
    children: React.ReactNode;
}) {

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadUser =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    if (!token) {

                        setLoading(false);

                        return;
                    }

                    const currentUser =
                        await getCurrentUserRequest();

                    setUser(
                        currentUser
                    );

                } catch {

                    localStorage.removeItem(
                        "token"
                    );

                    setUser(null);

                } finally {

                    setLoading(false);
                }
            };

        loadUser();

    }, []);

    const login = async (
        email: string,
        password: string
    ) => {

        const response =
            await loginRequest(
                email,
                password
            );

        localStorage.setItem(
            "token",
            response.access_token
        );

        const currentUser =
            await getCurrentUserRequest();

        setUser(
            currentUser
        );
    };

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,

                isAuthenticated:
                    !!user,

                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}