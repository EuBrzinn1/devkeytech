import "./Cards.css";
import { Play } from "lucide-react";

function Cards({ title, category, banner }) {
  return (
    <div className="vortex-card">
      <img src={banner} alt={title} className="card-img" />

      <div className="card-info">
        <h4>{title}</h4>
        <p>{category}</p>

        <button className="play-btn">
          <Play size={14} fill="white" />
        </button>
      </div>
    </div>
  );
}

export default Cards;