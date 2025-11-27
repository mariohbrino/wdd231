import places from "../data/places.json" with { type: "json" };

const displayPlaces = (data) => {
  const placesList = document.querySelector("#placesList");
  
  data.forEach((place) => {
    const card = document.createElement("section");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const address = document.createElement("address");
    const placeFigure = document.createElement("figure");
    const placeImage = document.createElement("img");
    const readButton = document.createElement("button");

    card.classList.add("place-card");
    title.classList.add("place-title");

    title.innerHTML = `${place.name}`;
    description.innerHTML = `${place.description}`;
    address.innerHTML = `${place.address}`;

    placeImage.setAttribute("src", place.image_url);
    placeImage.setAttribute("alt", `Place - ${place.name}`);
    placeImage.setAttribute("loading", "lazy");
    placeImage.setAttribute("width", "300");
    placeImage.setAttribute("height", "200");

    readButton.innerHTML = "Read More";

    placeFigure.appendChild(placeImage);

    card.appendChild(placeFigure);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(address);
    card.appendChild(readButton);

    placesList.appendChild(card);
  });
};

const renderPlaces = () => {
  displayPlaces(places);
}

export { renderPlaces };
