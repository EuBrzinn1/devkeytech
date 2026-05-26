import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // importanto o swiper e o swiperslide
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'; // modulos necessários para o swiper!!
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css';


import foto1 from '../assets/netflix.webp.png';
import foto2 from '../assets/spotify.webp.png';
import foto3 from '../assets/xbox.webp.png';
import foto4 from '../assets/psn.webp.png';
import foto5 from '../assets/steam.webp.png';
import foto6 from '../assets/play.webp.png';

const Banner = () => {
  const images = [foto1, foto2, foto3, foto4, foto5, foto6];

  return (
    <div className="banner-container">
      <Swiper
        // os modulos estao presentes para a navegação, com o autoplay para ir sozinho mudando.
        modules={[Navigation, Pagination, Autoplay, A11y]}
        
      
        slidesPerView={1}         // Exibe 1 imagem por vez
        spaceBetween={0}          // Sem espaços vazios entre os slides
        loop={true}               // Cursor de "mãozinha" ao passar o mouse
        navigation={true}         // Mantendo as setas originais (o Swiper vai injetar as dele, controladas pelo CSS)
         
        
        // aqui deixa as bolinhas embaixo mostrando em qual esta
        pagination={{ clickable: true }} 
        

        autoplay={{    //aqui o autoplay que muda sozinho ira durar 5 segundo (5000ms)
          delay: 5000,
          disableOnInteraction: false, // Não para o autoplay se o usuário clicar no banner
        }}
        
        // Esta classe garante que o Swiper respeite os tamanhos do seu antigo "banner-track"
        className="banner-track" 
      >
        {images.map((img, index) => (
          <SwiperSlide className="banner-slide" key={index}>
            <img src={img} alt={`Banner ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;