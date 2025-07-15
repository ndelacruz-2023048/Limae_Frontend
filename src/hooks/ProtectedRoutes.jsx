import { Navigate } from "react-router";
import { UserAuth } from "../context/AuthContext";

export const ProtectedRoutes = ({ children, accesBy }) => {
    const { user, isAuthenticated, loading } = UserAuth();

    console.log('ProtectedRoutes - Estado actual:', { user, isAuthenticated, loading });

    if (loading) {
        return <div>Cargando... </div>; // Muestra un indicador de carga
    }

    if (accesBy === "non-authenticated") {
        return !isAuthenticated ? children : <Navigate to="/" />;
    } else if (accesBy === "authenticated") {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }

    return <Navigate to="/login" />;
};