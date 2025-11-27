import { setupMenuClickHandler } from "./menu.mjs";
import { renderFooter }  from "./dates.mjs";
import memberships from "../data/membership.json" with { type: "json" };

const displayMembershipDetails = (membership) => {
  return `
    <div class="membership-header">
      <h3 class="membership-name">${membership.name}</h3>
      <span class="membership-fees">$${membership.fee.toFixed(2)} per year</span>
    </div>
    <div class="membership-benefits">
      <ul>
        ${membership.benefits.map(benefit => `<li class="benefit-name">${benefit}</li>`).join('')}
      </ul>
    </div>
  `;
};

const displayMembership = (membership) => {
  const membershipDetails = document.querySelector("#membership-details");
  membershipDetails.innerHTML = '';
  membershipDetails.innerHTML = `
    <div class="modal-body">
    ${displayMembershipDetails(membership)}
    </div>
    <div class="modal-footer">
      <button id="closeModal">Close</button>
    </div>
  `;
  membershipDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    membershipDetails.close();
  });
}

const displayMembershipInfo = (data) => {
  const membershipInformation = document.querySelector("#membershipInformation");
  const listMembers = document.createElement("ul");

  data.forEach((member) => {
    const itemMember = document.createElement("li");
    const membershipName = document.createElement("span");
    const readMoreButton = document.createElement("button");
    membershipName.innerHTML = member.name;

    readMoreButton.innerHTML = "Read More";
    readMoreButton.addEventListener('click', () => {
      displayMembership(member);
    });

    itemMember.appendChild(membershipName);
    itemMember.appendChild(readMoreButton);
    listMembers.appendChild(itemMember);
  });

  membershipInformation.appendChild(listMembers);
};

const setTimestampOnForm = () => {
  const today = new Date();
  const hiddenTimestamp = joinForm.querySelector("#joinForm input[name=timestamp]");
  const timestemp = today.toLocaleString();
  hiddenTimestamp.value = timestemp;
};

const main = () => {
  setupMenuClickHandler();
  setTimestampOnForm();
  displayMembershipInfo(memberships);
  renderFooter();
};

main();
