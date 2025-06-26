import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="language-selector">
      <label htmlFor="language-select">{t('language')}:</label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        <option value="pt">{t('portuguese')}</option>
        <option value="en">{t('english')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;

