import { setupMenuClickHandler } from "./navigation.mjs";
import { renderFooter } from "./dates.mjs";
import { displayMap, toggleDrag, toggleDragButton } from "./maps.mjs";

const setupMap = async () => {
  await displayMap();
  toggleDrag();
  toggleDragButton();
};

const main = async () => {
  setupMenuClickHandler();
  await setupMap();
  renderFooter();
};

await main();
