const renderEvents = () => {
  const cardsInfo = document.querySelector("#cardsInfo");

  const card = document.createElement("div");
  const cardHeader = document.createElement("h2");
  const cardBody = document.createElement("div");
  const cardContent = document.createElement("div");

  card.classList.add("weather-card");
  cardHeader.classList.add("weather-card-header");
  cardContent.classList.add("weather-card-content");
  cardBody.classList.add("weather-card-body");

  cardHeader.innerHTML = `Events`;

  cardContent.appendChild(cardBody);

  card.appendChild(cardHeader);
  card.appendChild(cardContent);
  
  cardsInfo.appendChild(card);
};

export { renderEvents };
