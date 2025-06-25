# Sistema de Internacionalização - RPGen

## Funcionalidade Implementada

Foi implementado um sistema completo de internacionalização (i18n) para alternar entre português e inglês na interface do RPGen.

## Arquivos Criados/Modificados

### 1. Contexto de Idioma
- **Arquivo**: `src/context/LanguageContext.jsx`
- **Função**: Gerencia o estado do idioma atual e fornece traduções

### 2. Componente Seletor de Idioma
- **Arquivo**: `src/components/LanguageSelector.jsx`
- **Arquivo CSS**: `src/components/LanguageSelector.css`
- **Função**: Interface para o usuário selecionar o idioma

### 3. Páginas Atualizadas
- `src/App.jsx` - Adicionado LanguageProvider
- `src/pages/HomePage.jsx` - Implementadas traduções
- `src/pages/LoginPage.jsx` - Implementadas traduções
- `src/pages/RegisterPage.jsx` - Implementadas traduções
- `src/pages/MyCharactersPage.jsx` - Implementadas traduções
- `src/pages/CharacterCreatorPage/CharacterCreatorPage.jsx` - Implementadas traduções
- `src/pages/HomePage.css` - Estilo para seletor de idioma
- `src/pages/AuthPages.css` - Estilo para seletor de idioma
- `src/pages/MyCharactersPage.css` - Estilo para seletor de idioma
- `src/pages/CharacterCreatorPage/CharacterCreatorPage.css` - Estilo para seletor de idioma

## Como Funciona

### 1. Contexto de Idioma
O `LanguageContext` fornece:
- `language`: idioma atual ('pt' ou 'en')
- `changeLanguage(newLanguage)`: função para mudar o idioma
- `t(key)`: função para traduzir textos

### 2. Persistência
- O idioma selecionado é salvo no localStorage
- Ao recarregar a página, o idioma é recuperado automaticamente
- Idioma padrão: português ('pt')

### 3. Traduções Disponíveis
As traduções estão organizadas por seções:
- **HomePage**: títulos, descrições, botões
- **LoginPage**: formulário de login
- **RegisterPage**: formulário de registro
- **MyCharactersPage**: lista de personagens, navegação
- **CharacterCreatorPage**: criação/edição de personagens, templates
- **Seletor de idioma**: labels do próprio seletor

### 4. Uso do Hook
```jsx
import { useLanguage } from '../context/LanguageContext';

const MyComponent = () => {
  const { t, language, changeLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  );
};
```

## Textos Traduzidos

### Português (pt)
- "Um criador de personagens de RPG online, alimentado por Inteligência Artificial"
- "Novo por aqui?"
- "Já tem uma conta?"
- "Entrar", "Registrar"
- "Email", "Senha"

### Inglês (en)
- "An online RPG character creator, powered by Artificial Intelligence"
- "New here?"
- "Already have an account?"
- "Login", "Register"
- "Email", "Password"

## Como Adicionar Novas Traduções

1. Abra `src/context/LanguageContext.jsx`
2. Adicione a nova chave nos objetos `en` e `pt`:

```javascript
const translations = {
  en: {
    // ... traduções existentes
    newKey: "New text in English"
  },
  pt: {
    // ... traduções existentes
    newKey: "Novo texto em português"
  }
};
```

3. Use a tradução no componente:
```jsx
<p>{t('newKey')}</p>
```

## Localização do Seletor

O seletor de idioma aparece no canto superior direito de todas as páginas implementadas:
- Página inicial (HomePage)
- Página de login (LoginPage)
- Página de registro (RegisterPage)
- Página de personagens (MyCharactersPage)
- Página de criação/edição de personagens (CharacterCreatorPage)

## Estilo Visual

O seletor mantém a consistência visual com o tema D&D da aplicação:
- Cores que harmonizam com a paleta existente
- Bordas e efeitos hover consistentes
- Suporte a modo escuro

## Status da Implementação

✅ **Concluído:**
- Sistema de contexto React para gerenciamento de idioma
- Componente seletor de idioma
- Persistência no localStorage
- Traduções para todas as páginas principais:
  - HomePage (página inicial)
  - LoginPage (página de login)
  - RegisterPage (página de registro)
  - MyCharactersPage (página de personagens)
  - CharacterCreatorPage (página de criação/edição)
- Integração visual com o design existente

⚠️ **Observação:**
- A mudança de idioma pode requerer um refresh da página em alguns casos devido ao hot reload do React em desenvolvimento
- Em produção, a funcionalidade deve funcionar instantaneamente

## Próximos Passos Sugeridos

1. Adicionar traduções para componentes internos:
   - CharacterSheet e seus subcomponentes
   - ImportExportButtons
   - Mensagens de erro e validação

2. Implementar detecção automática do idioma do navegador

3. Adicionar mais idiomas (espanhol, francês, etc.)

4. Implementar traduções para mensagens de erro dinâmicas

