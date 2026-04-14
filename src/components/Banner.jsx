import React, { useState, useEffect } from 'react';
import './Banner.css';

// Importando as 6 imagens da pasta assets
import foto1 from '../assets/netflix.webp.png';
import foto2 from '../assets/spotify.webp.png';
import foto3 from '../assets/xbox.webp.png';
import foto4 from '../assets/psn.webp.png';
import foto5 from '../assets/steam.webp.png';
import foto6 from '../assets/play.webp.png'; // <- Adicionado o 6º banner

const Banner = () => {
  const images = [foto1, foto2, foto3, foto4, foto5, foto6];
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