import { formatPhoneNumber } from "./utils.mjs";

const url = '/wdd231/chamber/data/members.json';
const membersElement = document.querySelector("#members");

const displayCards = (members) => {
  membersElement.innerHTML = "";

  const gridList = document.createElement("div");

  gridList.id = "gridList";
  gridList.classList.add("grid");

  members.forEach((member) => {
    const card = document.createElement("section");
    const image = document.createElement("div");
    const attributes = document.createElement("div");
    const footer = document.createElement("div");
    const name = document.createElement("p");
    const address = document.createElement("p");
    const phoneNumber = document.createElement("p");
    const websiteUrl = document.createElement("p");
    const logoImage = document.createElement("img");

    card.classList.add("card");
    image.classList.add("card-image");
    footer.classList.add("card-footer");

    logoImage.setAttribute("src", member.image_url);
    logoImage.setAttribute("alt", `Member ${member.name}`);
    logoImage.setAttribute("loading", "lazy");

    name.innerHTML = `<span class="business-name">${member.name}</span>`;
    address.innerHTML = `<span class="business-address">${member.address}</span>`;

    phoneNumber.innerHTML = `<a href="tel:${member.phone_number}" class="business-phone" arial-label="Phone number for business ${member.name}">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
      </svg>
      ${formatPhoneNumber(member.phone_number)}
    </a>`;
    websiteUrl.innerHTML = `<a href="${member.website_url}" class="business-website-url" target="_blank" aria-label="Link for business ${member.name}">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
      </svg>
    </a>`;

    attributes.classList.add("card-attributes");

    attributes.appendChild(name);
    attributes.appendChild(address);

    footer.appendChild(phoneNumber);
    footer.appendChild(websiteUrl);

    image.appendChild(logoImage);

    card.appendChild(image);
    card.appendChild(attributes);
    card.appendChild(footer);

    gridList.appendChild(card);
  });

  membersElement.appendChild(gridList);
};

const displayTable = (members) => {
  membersElement.innerHTML = "";

  const tableList = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  tableList.id = "tableList";
  tableList.classList.add("table");

  const headerRow = document.createElement("tr");
  const headers = ["Name", "Address", "Phone", "Website"];
  headers.forEach(headerText => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  tableHead.appendChild(headerRow);

  members.forEach((member) => {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const address = document.createElement("td");
    const phoneNumber = document.createElement("td");
    const websiteUrl = document.createElement("td");

    name.setAttribute("data-label", "Name");
    address.setAttribute("data-label", "Address");
    phoneNumber.setAttribute("data-label", "Phone");
    websiteUrl.setAttribute("data-label", "Website");

    name.textContent = member.name;
    address.textContent = member.address;
    phoneNumber.innerHTML = `<a href="tel:${member.phone_number}" class="business-phone" aria-label="Phone number for business ${member.name}">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
      </svg>
      ${formatPhoneNumber(member.phone_number)}
    </a>`;
    websiteUrl.innerHTML = `<a href="${member.website_url}" target="_blank" aria-label="Link for business ${member.name}">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
      </svg>
    </a>`;

    row.appendChild(name);
    row.appendChild(address);
    row.appendChild(phoneNumber);
    row.appendChild(websiteUrl);

    tableBody.appendChild(row);
  });

  tableList.appendChild(tableHead);
  tableList.appendChild(tableBody);
  membersElement.appendChild(tableList);
};

const getMembersData = async (viewGrid = true) => {
  const response = await fetch(url);
  const data = await response.json();
  if (viewGrid) {
    displayCards(data.members);
  } else {
    displayTable(data.members);
  }
};

const switchListMode = () => {
  const membersGrid = document.querySelector("#membersGrid");
  const membersList = document.querySelector("#membersList");

  const buttons = [membersGrid, membersList];

  const removeActiveClass = () => {
    buttons.forEach(button => button.classList.remove("active"));
  };

  const setActiveButton = (activeButton) => {
    removeActiveClass();
    activeButton.classList.add("active");
  };

  membersGrid.addEventListener("click", () => {
    setActiveButton(membersGrid);
    getMembersData();
  });

  membersList.addEventListener("click", () => {
    setActiveButton(membersList);
    getMembersData(false);
  });

  setActiveButton(membersGrid);
};

getMembersData();
switchListMode();
