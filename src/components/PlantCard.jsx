import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  const buttonText = plant.soldOut ? "Out of Stock" : "In Stock";

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>Price: {plant.price}</p>
      <button
        className={plant.soldOut ? "" : "primary"}
        onClick={() => onToggleSoldOut(plant.id)}
      >
        {buttonText}
      </button>
    </li>
  );
}

export default PlantCard;
