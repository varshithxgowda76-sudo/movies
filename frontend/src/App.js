import { Routes, Route, Navigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";



function App() {
  return (
    <Routes>

      {/* Default redirect */}
      <Route
        path="/"
        element={
          isAuthenticated()
            ? <Navigate to="/home" />
            : <Navigate to="/login" />
        }
      />

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected App */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MovieList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
