import { setupMenuClickHandler } from "./navigation.mjs";
import { renderFooter } from "./dates.mjs";
import { displayMap, toggleDrag, toggleDragButton } from "./maps.mjs";

const setupMap = () => {
  displayMap(false, true);
  toggleDrag();
  toggleDragButton();
};

const main = () => {
  setupMenuClickHandler();
  setupMap();
  renderFooter();
};

main();
