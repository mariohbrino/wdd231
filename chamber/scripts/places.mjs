import places from "../data/places.json" with { type: "json" };

const displayPlaces = (data) => {
  const placesList = document.querySelector("#placesList");
  
  data.forEach((place) => {
    const card = document.createElement("section");
    const name = document.createElement("h2");
    const description = document.createElement("p");
    const address = document.createElement("address");
    const placeFigure = document.createElement("figure");
    const placeImage = document.createElement("img");

    name.innerHTML = `${place.name}`;
    description.innerHTML = `${place.description}`;
    address.innerHTML = `${place.address}`;

    placeImage.setAttribute("src", place.image_url);
    placeImage.setAttribute("alt", `Place - ${place.name}`);
    placeImage.setAttribute("loading", "lazy");

    placeFigure.appendChild(placeImage);

    card.appendChild(placeFigure);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(address);

    placesList.appendChild(card);
  });
};

const renderPlaces = () => {
  displayPlaces(places);
}

export { renderPlaces };
