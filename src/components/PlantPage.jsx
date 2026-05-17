import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantsPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((resp) => resp.json())
      .then((data) => {
        const normalizedPlants = data.map((plant) => ({
          ...plant,
          soldOut: false,
        }));
        setPlants(normalizedPlants);
      });
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((resp) => resp.json())
      .then((createdPlant) => {
        setPlants((previousPlants) => [
          ...previousPlants,
          { ...createdPlant, soldOut: false },
        ]);
      });
  };

  const handleToggleSoldOut = (plantId) => {
    setPlants((previousPlants) =>
      previousPlants.map((plant) =>
        plant.id === plantId
          ? { ...plant, soldOut: !plant.soldOut }
          : plant
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

