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
<<<<<<< dark_mode
    <ThemeProvider> {/* <- Envolve tudo com ThemeProvider */}
      <Router>
=======
    <Router>
      <LanguageProvider>
>>>>>>> main
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

<<<<<<< dark_mode
            {/* Rotas protegidas */}
=======
            {/* Rotas protegidas (usuário autenticado + personagens disponíveis) */}
>>>>>>> main
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
<<<<<<< dark_mode
      </Router>
    </ThemeProvider>
=======
      </LanguageProvider>
    </Router>
>>>>>>> main
  );
}

export default App;