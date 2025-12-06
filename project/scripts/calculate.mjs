import { setupMenuClickHandler } from "./navigation.mjs";
import { renderFooter } from "./dates.mjs";
import { displayMap, recenterMap, toggleDrag, toggleDragButton } from "./maps.mjs";

const setupMap = async () => {
  await displayMap(true);
  recenterMap();
  toggleDrag();
  toggleDragButton();
};

const main = async () => {
  setupMenuClickHandler();
  await setupMap();
  renderFooter();
};

await main();
