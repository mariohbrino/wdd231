const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement("section");
    const header = document.createElement("h2");
    const portrait = document.createElement("img");
    const attributes = document.createElement("div");
    const birthplace = document.createElement("p");
    const birthdate = document.createElement("p");

    card.classList.add("card");
    header.classList.add("card-header");
    header.innerHTML = `${prophet.lastname}, ${prophet.name}`;
    
    portrait.classList.add("card-image");
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    attributes.classList.add("card-attributes");

    birthplace.innerHTML = `<span class="attribute-label">Birthplace</span>: ${prophet.birthplace}`;
    birthdate.innerHTML = `<span class="attribute-label">Birthdate</span>: ${prophet.birthdate}`;
    
    attributes.appendChild(birthplace);
    attributes.appendChild(birthdate);
    
    card.appendChild(portrait);
    card.appendChild(header);
    card.appendChild(attributes);

    cards.appendChild(card);
  });
};

const getProphetData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets);
  displayProphets(data.prophets);
};

getProphetData();