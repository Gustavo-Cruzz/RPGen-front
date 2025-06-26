import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
import "./HomePage.css";
import { useTheme } from "../hooks/ThemeContext"; // <- Corrigido o caminho

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="home-container">
      <div className="language-selector-container">
        <LanguageSelector />
      </div>
      
      <div className="app-header">
        <h1>{t('appTitle')}</h1>
        <p>
          {t('appDescription')}
        </p>

        {/* Botão de alternância de tema */}
        <button
          onClick={toggleTheme}
          className="auth-button"
          style={{ marginTop: "1rem" }}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <div className="auth-options">
        <div className="auth-box">
          <h3>{t('newHere')}</h3>
          <p>
            {t('newHereDescription')}
          </p>
          <Link to="/register" className="auth-button">
            {t('register')}
          </Link>
        </div>
        <div className="auth-box">
          <h3>{t('alreadyHaveAccount')}</h3>
          <p>{t('alreadyHaveAccountDescription')}</p>
          <Link to="/login" className="auth-button">
            {t('login')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
