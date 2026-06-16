import {
    Routes,
    Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import XraysPage from "./pages/XraysPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import AnalysisDetailPage from "./pages/AnalysisDetailPage";
import MyAnalysesPage from "./pages/MyAnalysesPage";
import FeedbacksPage from "./pages/FeedbacksPage";

function App() {
    return (
        <Routes>
            {/* 2. AGREGA LA RUTA DE LA LANDING PAGE AQUÍ */}
            <Route 
                path="/" 
                element={<LandingPage />} 
            />

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
                        <ProtectedRoute>
                            <XraysPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyses"
                    element={
                        <ProtectedRoute>
                            <MyAnalysesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/feedback"
                    element={
                        <ProtectedRoute>
                            <FeedbacksPage />
                        </ProtectedRoute>
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

            <Route
                path="/analysis/:analysisId"
                element={
                    <ProtectedRoute>
                        <AnalysisDetailPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;