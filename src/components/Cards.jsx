import './Cards.css';

function Cards({ banner, title, category, onClick, price, index }) {
  return (
    
    <div className="card" onClick={onClick}
    
      data-aos = "fade-up" //defini o efeito
      data-aos-delay = {index * 100} //define o tempo de animação de cada CARD

    >
      <img src={banner} alt={title} />

      <div className="card-content">
        <h3>{title}</h3>
        <p>{category}</p>
        <h3>  {price}</h3>
      </div>
    </div>
  );
}

export default Cards;