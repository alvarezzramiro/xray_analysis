import {
    Routes,
    Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/xrays"
                    element={
                        <div>
                            My X-Rays
                        </div>
                    }
                />

                <Route
                    path="/analyses"
                    element={
                        <div>
                            Analyses
                        </div>
                    }
                />

                <Route
                    path="/feedback"
                    element={
                        <div>
                            Feedback
                        </div>
                    }
                />

            </Route>

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <DashboardLayout />
                    </AdminRoute>
                }
            >

                <Route
                    index
                    element={
                        <AdminDashboardPage />
                    }
                />

            </Route>
                        
        </Routes>

    );
}

export default App;