import './Cards.css';

function Cards({ banner, title, category, onClick, price, index, corEscolhida, quantidade, onRemover }) {
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
        
        {/* Exibe a cor escolhida e adiciona o contador (X) ao lado se houver quantidade acumulada */}
        {corEscolhida && (
          <p className="cor-selecionada">
            <strong className='corzinha'>Especificação: </strong> 
            {quantidade && quantidade > 1 ? `(${quantidade}) ${corEscolhida}` : corEscolhida}
          </p>
        )}

        {/* BOTÃO REMOVER: Só aparece se a propriedade onRemover for enviada (ou seja, apenas na aba do carrinho) */}
        {onRemover && (
          <button 
            className="btn-remover-card"
            onClick={(e) => {
              e.stopPropagation(); // Impede que o clique abra o modal do produto
              onRemover();
            }}
          >
            Remover do Carrinho
          </button>
        )}
      </div>
    </div>
  );
}

export default Cards;