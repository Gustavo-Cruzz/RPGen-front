import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // HomePage
    appTitle: "RPGen",
    appDescription: "An online RPG character creator, powered by Artificial Intelligence",
    newHere: "New here?",
    newHereDescription: "Then what are you waiting for? Create your account and have fun with your characters!",
    register: "Register",
    alreadyHaveAccount: "Already have an account?",
    alreadyHaveAccountDescription: "Great, then login to view your characters! Let the fun begin!",
    login: "Login",
    
    // LoginPage
    loginTitle: "Login",
    email: "Email",
    password: "Password",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    registerHere: "Register here",
    
    // RegisterPage
    registerTitle: "Register",
    name: "Name",
    confirmPassword: "Confirm Password",
    registerButton: "Register",
    haveAccount: "Already have an account?",
    loginHere: "Login here",
    
    // MyCharactersPage
    myCharacters: "My Characters",
    createNewCharacter: "Create New Character",
    noCharacters: "You don't have any characters yet.",
    loadingCharacters: "Loading characters...",
    numberOfCharacters: "Number of characters",
    homepage: "Homepage",
    logout: "Logout",
    
    // CharacterCreatorPage
    characterCreator: "Character Creator",
    generateCharacter: "Generate Character",
    downloadPdf: "Download PDF",
    importCharacter: "Import Character",
    exportCharacter: "Export Character",
    loadingCharacter: "Loading Character...",
    backToMyCharacters: "Back to My Characters",
    createCharacter: "Create Character",
    updateCharacter: "Update Character",
    chooseTemplate: "Choose your template:",
    pathfinderComingSoon: "Pathfinder (coming soon)",
    cthulhuComingSoon: "Call of Cthulhu (coming soon)",
    saveCharacter: "Save Character",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    deleteCharacter: "Delete Character",
    deleteConfirmation: "Are you sure you want to delete this character? This action cannot be undone.",
    
    // Language selector
    language: "Language",
    portuguese: "Portuguese",
    english: "English"
  },
  pt: {
    // HomePage
    appTitle: "RPGen",
    appDescription: "Um criador de personagens de RPG online, alimentado por Inteligência Artificial",
    newHere: "Novo por aqui?",
    newHereDescription: "Então o que você está esperando? Crie sua conta e se divirta com seus personagens!",
    register: "Registrar",
    alreadyHaveAccount: "Já tem uma conta?",
    alreadyHaveAccountDescription: "Ótimo, então faça login para ver seus personagens! Que a diversão comece!",
    login: "Entrar",
    
    // LoginPage
    loginTitle: "Entrar",
    email: "Email",
    password: "Senha",
    loginButton: "Entrar",
    noAccount: "Não tem uma conta?",
    registerHere: "Registre-se aqui",
    
    // RegisterPage
    registerTitle: "Registrar",
    name: "Nome",
    confirmPassword: "Confirmar Senha",
    registerButton: "Registrar",
    haveAccount: "Já tem uma conta?",
    loginHere: "Entre aqui",
    
    // MyCharactersPage
    myCharacters: "Meus Personagens",
    createNewCharacter: "Criar Novo Personagem",
    noCharacters: "Você ainda não tem nenhum personagem.",
    loadingCharacters: "Carregando personagens...",
    numberOfCharacters: "Número de personagens",
    homepage: "Página Inicial",
    logout: "Sair",
    
    // CharacterCreatorPage
    characterCreator: "Criador de Personagens",
    generateCharacter: "Gerar Personagem",
    downloadPdf: "Baixar PDF",
    importCharacter: "Importar Personagem",
    exportCharacter: "Exportar Personagem",
    loadingCharacter: "Carregando Personagem...",
    backToMyCharacters: "Voltar aos Meus Personagens",
    createCharacter: "Criar Personagem",
    updateCharacter: "Atualizar Personagem",
    chooseTemplate: "Escolha seu template:",
    pathfinderComingSoon: "Pathfinder (em breve)",
    cthulhuComingSoon: "Call of Cthulhu (em breve)",
    saveCharacter: "Salvar Personagem",
    saveChanges: "Salvar Alterações",
    cancel: "Cancelar",
    deleteCharacter: "Deletar Personagem",
    deleteConfirmation: "Você tem certeza que deseja deletar este personagem? Esta ação não pode ser desfeita.",
    
    // Language selector
    language: "Idioma",
    portuguese: "Português",
    english: "Inglês"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Recuperar idioma salvo no localStorage ou usar português como padrão
    return localStorage.getItem('language') || 'pt';
  });

  useEffect(() => {
    // Salvar idioma no localStorage sempre que mudar
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

