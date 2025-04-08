import React, { useEffect } from 'react';
import './IntroAnimation.css'; // Estilos específicos (opcional)

const IntroAnimation = ({ onComplete }) => {
  useEffect(() => {
    const typingElement = document.getElementById("typing");
    const introContainer = document.querySelector(".intro-container");
    const text = "RPGen";
    let index = 0;

    // Criar elemento de logo
    const logoImg = document.createElement('img');
    logoImg.src = 'src/components/assets/images/rpgenlogo.png'; // Atualize com o caminho da sua logo
    logoImg.alt = 'Logo';
    logoImg.className = 'intro-logo';
    logoImg.style.opacity = '0';
    logoImg.style.transition = 'opacity 0.5s ease';
    typingElement.parentNode.insertBefore(logoImg, typingElement);
const typeEffect = () => {
    if (index < text.length) {
    typingElement.innerHTML = text.substring(0, index + 1);
    index++;
    setTimeout(typeEffect, 150);
    } else {
    setTimeout(() => {
        if (onComplete) onComplete();
    }, 1000);
    }
};

    setTimeout(typeEffect, 500);
  }, [onComplete]);

  return (
    <div className="intro-container">
      <img src="/logo.svg" alt="Logo" className="intro-logo" />
      <div id="typing" className="typing-text"></div>
      <span className="cursor">|</span>
    </div>
  );
};

export default IntroAnimation;