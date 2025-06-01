import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyCharactersPage from "./pages/MyCharactersPage";
import CharacterCreatorPage from "./pages/CharacterCreatorPage";
import { AuthProvider } from "./context/AuthContext";
import { CharactersProvider } from "./context/CharactersContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/my-characters"
            element={
              <ProtectedRoute>
                <CharactersProvider>
                  <MyCharactersPage />
                </CharactersProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/character/:id"
            element={
              <ProtectedRoute>
                <CharactersProvider>
                  <CharacterCreatorPage />
                </CharactersProvider>
              </ProtectedRoute>
            }
          />
          <Route
          path="/character/:id"
          element={
            <ProtectedRoute>
              <CharactersProvider>
                <CharacterCreatorPage/>
              </CharactersProvider>
            </ProtectedRoute>
          }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;