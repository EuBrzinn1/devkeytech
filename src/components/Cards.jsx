import './Cards.css';

function Cards({ banner, title, category, onClick, price, index, corEscolhida }) {
  return (
    <div 
      className="card" 
      onClick={onClick}
      data-aos="fade-up" // define o efeito
      data-aos-delay={index * 100} // define o tempo de animação de cada CARD
    >
      <img src={banner} alt={title} />

      <div className="card-content">
        <h3>{title}</h3>
        <p>{category}</p>
        <h3>{price}</h3>
        
        {/* Se o card receber uma cor escolhida, exibe ela aqui */}
        {corEscolhida && (
          <p className="cor-selecionada">
            <strong className='corzinha'>Especificação: </strong> {corEscolhida}
          </p>
        )}
      </div>
    </div>
  );
}

export default Cards;