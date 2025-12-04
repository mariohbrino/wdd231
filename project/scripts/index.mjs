import { setupMenuClickHandler } from "./navigation.mjs";
import { renderFooter } from "./dates.mjs";

const main = () => {
  setupMenuClickHandler();
  renderFooter();
};

main();
