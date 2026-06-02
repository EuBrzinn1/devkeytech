import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // importanto o swiper e o swiperslide
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'; // modulos necessários para o swiper!!
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css';


import iphone from "../assets/1iphone.png";
import netflix from '../assets/1netflix.png';
import play from '../assets/1play.png';
import psn from '../assets/1psn.png';
import tv from '../assets/1tv.png';
import xbox from '../assets/1xbox.png';

const Banner = () => {
  const images = [iphone, netflix, play, psn, tv, xbox];

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