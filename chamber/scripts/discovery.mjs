import { setupMenuClickHandler } from "./menu.mjs";
import { renderPlaces } from "./places.mjs";
import { renderFooter }  from "./dates.mjs";

const main = () => {
  setupMenuClickHandler();
  renderPlaces();
  renderFooter();
};

main();
