import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyCharactersPage from "./pages/MyCharactersPage";
import CharacterCreatorPage from "./pages/CharacterCreatorPage/CharacterCreatorPage";
import { AuthProvider } from "./context/AuthContext";
import { CharactersProvider } from "./context/CharactersContext";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ThemeProvider } from "./hooks/ThemeContext"; // <- Importa o ThemeProvider

function App() {
  return (

    <ThemeProvider> {/* <- Envolve tudo com ThemeProvider */}
      <Router>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />


            {/* Rotas protegidas */}
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
          </Routes>
        </AuthProvider>
      </LanguageProvider>
      </Router>
    </ThemeProvider>

  );
}

export default App;