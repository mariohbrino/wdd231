import { storeVisitedDate } from "./visited.mjs";
import { setupMenuClickHandler } from "./menu.mjs";
import { renderPlaces } from "./places.mjs";
import { renderFooter }  from "./dates.mjs";

const addDays = (day = 0) => {
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const now = new Date(new Date().getTime() + dayInMilliseconds * day);
  return now;
};

const removeDays = (day = 0) => {
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const now = new Date(new Date().getTime() - dayInMilliseconds * day);
  return now;
};

const main = () => {
  // storeVisitedDate(removeDays(), true);
  // storeVisitedDate(addDays(), false);
  const now = new Date();
  storeVisitedDate(now);
  setupMenuClickHandler();
  renderPlaces();
  renderFooter();
};

main();
