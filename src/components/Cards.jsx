import './Cards.css';

function Cards({ banner, title, category, onClick, price }) {
  return (
    
    <div className="card" onClick={onClick}>
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