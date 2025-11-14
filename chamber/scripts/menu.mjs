const toggleIcon = () => {
  const openIcon = document.querySelector("#openIcon");
  const closeIcon = document.querySelector("#closeIcon");
  const menu = document.querySelector("#toogleMenu");

  menu.classList.toggle("open");

  openIcon.classList.toggle("open-icon", !menu.classList.contains("open"));
  openIcon.classList.toggle("close-icon", menu.classList.contains("open"));
  closeIcon.classList.toggle("close-icon", !menu.classList.contains("open"));
  closeIcon.classList.toggle("open-icon", menu.classList.contains("open"));
};

const setupMenuClickHandler = () => {
  const toogleMenu = document.querySelector("#toogleMenu");
  const navigation = document.querySelector("nav");
  
  toogleMenu.addEventListener("click", () => {
    toggleIcon();

    navigation.classList.toggle("open");

    navigation.classList.toggle("nav-hidden", !navigation.classList.contains("open"));
  });
};

setupMenuClickHandler();
