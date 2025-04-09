import React, { useEffect, useRef } from 'react';
import './components/IntroAnimation.css';
import rpgenLogo from './public/images/rpgenlogo.png'; 

const IntroAnimation = ({ onComplete }) => {
  const typingElementRef = useRef(null);

  useEffect(() => {
    const typingElement = typingElementRef.current;
    const text = "RPGen";
    let index = 0;

    // Criar elemento de logo
    const logoImg = document.createElement('img');
    logoImg.src = rpgenLogo; // Use a imagem importada
    logoImg.alt = 'RPGen Logo';
    logoImg.className = 'intro-logo';
    logoImg.style.opacity = '0';
    logoImg.style.transition = 'opacity 0.5s ease';
    
    if (typingElement && typingElement.parentNode) {
      typingElement.parentNode.insertBefore(logoImg, typingElement);
    }

    const typeEffect = () => {
      if (index < text.length) {
        typingElement.innerHTML = text.substring(0, index + 1);
        index++;
        setTimeout(typeEffect, 150);
      } else {
        // Mostrar logo quando o texto terminar de digitar
        logoImg.style.opacity = '1';
        
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
    };

    const timer = setTimeout(typeEffect, 500);
    
    return () => {
      clearTimeout(timer);
      // Limpeza: remove a logo adicionada dinamicamente
      if (logoImg.parentNode) {
        logoImg.parentNode.removeChild(logoImg);
      }
    };
  }, [onComplete, rpgenLogo]);

  return (
    <div className="intro-container">
      <div ref={typingElementRef} className="typing-text"></div>
      <span className="cursor">|</span>
    </div>
  );
};

export default IntroAnimation;