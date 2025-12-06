import { formatPhoneNumber } from "./utils.mjs";

const displayRestaurants = (data) => {
  const restaurantsList = document.querySelector("#restaurantsList");
  restaurantsList.innerHTML = "";

  const gridList = document.createElement("div");
  const gridHeader = document.createElement("h2");

  restaurantsList.appendChild(gridHeader);

  gridHeader.innerHTML = "List of Restaurants";

  gridList.id = "gridList";
  gridList.classList.add("grid");

  data.forEach((restaurant) => {
    const card = document.createElement("section");
    const image = document.createElement("div");
    const attributes = document.createElement("div");
    const footer = document.createElement("div");
    const name = document.createElement("p");
    const address = document.createElement("p");
    const phoneNumber = document.createElement("p");
    const websiteUrl = document.createElement("p");
    const logoImage = document.createElement("img");

    card.classList.add("card");
    image.classList.add("card-image");
    footer.classList.add("card-footer");

    logoImage.setAttribute("src", restaurant.image_url);
    logoImage.setAttribute("alt", `Restaurant ${restaurant.name}`);
    logoImage.setAttribute("loading", "lazy");

    name.innerHTML = `<span>${restaurant.name}</span>`;
    address.innerHTML = `<span>${restaurant.address}</span>`;

    phoneNumber.innerHTML = `<a href="tel:${restaurant.phone_number}" arial-label="Phone number for business ${restaurant.name}">${formatPhoneNumber(restaurant.phone_number)}</a>`;
    websiteUrl.innerHTML = `<a href="${restaurant.website_url}" target="_blank" aria-label="Link for business ${restaurant.name}">Link</a>`;

    attributes.classList.add("card-attributes");

    attributes.appendChild(name);
    attributes.appendChild(address);

    footer.appendChild(phoneNumber);
    footer.appendChild(websiteUrl);

    image.appendChild(logoImage);

    card.appendChild(image);
    card.appendChild(attributes);
    card.appendChild(footer);

    gridList.appendChild(card);
  });

  restaurantsList.appendChild(gridList);
};

const renderRestaurants = async () => {
  try {
    const response = await fetch("./data/restaurants.json");
    if (response.ok) {
      const data = await response.json();
      displayRestaurants(data.restaurants);
      return data.restaurants;
    }
  } catch (error) {
    console.log(error);
  }
};

export { renderRestaurants };
