import { setupMenuClickHandler } from "./navigation.mjs";
import { renderFooter } from "./dates.mjs";
import { displayMap, recenterMap, toggleDrag, toggleDragButton, populateMarkers } from "./maps.mjs";
import { renderRestaurants } from "./restaurants.mjs";

const setupMap = async (data) => {
  await displayMap();
  recenterMap();
  toggleDrag();
  toggleDragButton();
  populateMarkers(data.map((restaurant) => {
    return {
      name: restaurant.name,
      longitude: restaurant.longitude,
      latitude: restaurant.latitude
    }
  }));
};

const main = async () => {
  setupMenuClickHandler();
  const data = await renderRestaurants();
  await setupMap(data);
  renderFooter();
};

await main();
