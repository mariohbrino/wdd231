import { setupMenuClickHandler } from "./menu.mjs";
import { getMembersData, switchListMode } from "./members.mjs";
import { renderFooter }  from "./dates.mjs";

const main = () => {
  setupMenuClickHandler();
  getMembersData();
  switchListMode();
  renderFooter();
};

main();
