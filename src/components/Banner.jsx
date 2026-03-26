import React, { useState, useEffect } from 'react';
import './Banner.css';

// Importando as imagens da pasta assets
import foto1 from '../assets/foto1.webp';
import foto2 from '../assets/foto2.webp';
import foto3 from '../assets/foto3.webp';
import foto4 from '../assets/foto4.webp';
import foto5 from '../assets/foto5.webp';

const Banner = () => {
  const images = [foto1, foto2, foto3, foto4, foto5];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Função para ir para a próxima imagem
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Função para voltar uma imagem
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Função para ir direto para a bolinha clicada
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Faz o banner rodar sozinho a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 
    return () => clearInterval(interval);
  }, [currentIndex]); 

  return (
    <div className="banner-container">
      {/* O trilho que desliza */}
      <div 
        className="banner-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="banner-slide" key={index}>
            <img src={img} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Botões de Navegação */}
      <button className="nav-button left-arrow" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="nav-button right-arrow" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Bolinhas de Paginação */}
      <div className="dots-container">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;