import './Cards.css';

function Cards({ banner, title, category }) {
  return (
    <div className="card">
      <img src={banner} alt={title} />

      <div className="card-content">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
}

export default Cards;