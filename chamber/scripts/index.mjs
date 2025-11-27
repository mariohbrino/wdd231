import { setupMenuClickHandler } from "./menu.mjs";
import { renderEvents } from "./events.mjs";
import { renderWeather } from "./weather.mjs";
import { renderRandomMembers } from "./random_members.mjs";
import { renderFooter }  from "./dates.mjs";

const main = () => {
  setupMenuClickHandler();
  renderEvents();
  renderWeather();
  renderRandomMembers();
  renderFooter();
};

main();
