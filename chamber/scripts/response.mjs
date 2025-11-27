import { setupMenuClickHandler } from "./menu.mjs";
import { renderFooter }  from "./dates.mjs";
import memberships from "../data/membership.json" with { type: "json" };

const findMembership = (membershipLevel) => {
  const pickedMembership = memberships.filter(
    (membership) => membership.id === membershipLevel
  );
  return pickedMembership[0];
};

const displayRequest = (data) => {
  const results = document.querySelector("#response");
  const membership = findMembership(data.get('membership-level'));
  results.innerHTML = `
    <h2>Membership Requested</h2>
    <div class="membership-requestd">
      <p>Membership level: ${membership.name}</p>
      <p>First name: ${data.get('first')}</p>
      <p>Last name: ${data.get('last')}</p>
      <p>Email: ${data.get('email')}</p>
      <p>Phone: ${data.get('phone')}</p>
      <p>Membership level: ${data.get('membership-level')}</p>
      <p>Organization name: ${data.get('organization-name')}</p>
      <p>Organization title: ${data.get('organization-title')}</p>
      <p>Organization description: ${data.get('organization-description')}</p>
      <p>Timestamp: ${data.get('timestamp')}</p>
    </div>
  `;
};

const getDate = () => {
  const membershipRequest = new URLSearchParams(window.location.search);
  return membershipRequest;
}

const displayResponse = () => {
  const data = getDate();
  displayRequest(data);
}

const main = () => {
  setupMenuClickHandler();
  displayResponse();
  renderFooter();
};

main();
