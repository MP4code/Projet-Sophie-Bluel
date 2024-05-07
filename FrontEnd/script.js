const token = localStorage.getItem("token");
let worksList = [];
let categories = [];

const generateLogoutButton = () => {
  let authButton = document.querySelector(".authButton");
  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  };
  authButton.innerHTML = "";
  const logoutButton = document.createElement("a");
  logoutButton.innerHTML = "logout";
  logoutButton.addEventListener("click", logoutUser);
  authButton.appendChild(logoutButton);
};

const generateTopBar = () => {
  const body = document.querySelector("body");
  const topBar = document.createElement("div");
  const modeEdit = document.createElement("div");
  const iconEdit = document.createElement("i");
  iconEdit.className = "fa-regular fa-pen-to-square";

  const texte = document.createElement("p");
  topBar.appendChild(iconEdit);
  topBar.appendChild(modeEdit);
  topBar.appendChild(texte);
  modeEdit.appendChild(iconEdit);
  modeEdit.appendChild(texte);
  texte.innerText = "Mode édition";

  topBar.className = "topBar";
  modeEdit.className = "modeEdit";
  body.insertBefore(topBar, body.firstChild);
};

const generateEditButton = () => {
  const projet_edit = document.querySelector(".projet_edit");
  const button_edit = document.createElement("input");
  const projet_edit_div = document.createElement("div");
  projet_edit_div.className = "projet_edit_div";
  projet_edit.appendChild(projet_edit_div);
  button_edit.className = " button_edit";
  const iconEdit = document.createElement("i");
  iconEdit.className = "fa-regular fa-pen-to-square";
  projet_edit_div.appendChild(iconEdit);
  button_edit.type = "button";
  button_edit.value = "modifier";
  projet_edit_div.appendChild(button_edit);
  const titre = document.querySelector("#portfolio h2");
  titre.className = "projet_edit_h2";
};
if (token) {
  generateLogoutButton();
  generateTopBar();
  generateEditButton();
}

const getWorks = () => {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
  })
    .then((res) => res.json())
    .then(async (data) => {
      worksList = await data;
      displayWorks(0);
    });
};
getWorks();

const displayWorks = (categoryId) => {
  let data = [];
  if (categoryId === 0) {
    data = worksList;
  } else {
    data = worksList.filter((work) => work.categoryId === categoryId);
  }
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = data[i].imageUrl;
    img.alt = data[i].title;
    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = data[i].title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
    const filterButtons = document.getElementsByClassName("filter_button");
    for (let i = 0; i < filterButtons.length; i++) {
      if (parseInt(filterButtons[i].id) === categoryId) {
        filterButtons[i].className = "filter_button filter_selected";
      } else {
        filterButtons[i].className = "filter_button filter_not_selected";
      }
    }
  }
};

const getCategories = () => {
  fetch("http://localhost:5678/api/categories", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      categories = data;

      if (!token) {
        displayCategories();
      }
    });
};
const displayCategories = () => {
  let filter = document.querySelector(".filter");
  categories.push({ id: 0, name: "Tous" });
  categories.sort((a, b) => a.id - b.id);
  for (let i = 0; i < categories.length; i++) {
    const input = document.createElement("input");
    input.type = "button";
    if (categories[i].id === 0) {
      input.className = "filter_button filter_selected";
    } else {
      input.className = "filter_button filter_not_selected";
    }
    input.id = categories[i].id;
    input.value = categories[i].name;
    input.addEventListener("click", () => displayWorks(categories[i].id));
    filter.appendChild(input);
  }
};
getCategories();
