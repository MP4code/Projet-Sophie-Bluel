const token = localStorage.getItem("token");
let worksList = [];
let categories = [];

const modal = document.querySelector(".modal");

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
/*modal*/
const openModal = () => {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContainer.appendChild(modalContent);
  modal.appendChild(modalContainer);
  generateFirstModalContent();
};

const closeModal = () => {
  modal.innerHTML = "";
};

const generateFirstModalContent = () => {
  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";
  const closeButton = document.createElement("div");
  const iconClose = document.createElement("i");
  iconClose.className = "fa-solid fa-xmark";
  closeButton.append(iconClose);
  const line = document.createElement("div");
  line.className = "line";
  closeButton.addEventListener("click", closeModal);
  closeButton.className = "closeButton";
  const title = document.createElement("h3");
  title.className = "modal-title";
  title.innerHTML = "Galerie photo";
  const galleryModalContainer = document.createElement("div");
  const galleryModal = document.createElement("div");
  galleryModalContainer.className = "galleryModalContainer";
  galleryModal.className = "galleryModal";

  for (let i = 0; i < worksList.length; i++) {
    const img = document.createElement("img");
    img.src = worksList[i].imageUrl;
    img.alt = worksList[i].title;

    galleryModal.appendChild(img);
    const trashImg = document.createElement("div");
    trashImg.className = "trashImg";
    galleryModal.appendChild(trashImg);
    trashImg.append(img);
    const trash = document.createElement("div");
    trash.className = "trash";
    const iconTrash = document.createElement("i");
    iconTrash.className = "fa-solid fa-trash-can";
    trash.appendChild(iconTrash);
    galleryModal.append(trash);
    trashImg.append(trash);
  }

  const button = document.createElement("button");
  button.innerHTML = "Ajouter une photo";
  button.addEventListener("click", generateSecondeModalContent);
  modalContent.appendChild(title);
  modalContent.appendChild(galleryModalContainer);
  modalContent.appendChild(galleryModal);
  modalContent.appendChild(line);
  modalContent.appendChild(button);
  modalContent.appendChild(closeButton);
  galleryModalContainer.append(galleryModal);
};
/*modal 2*/

const generateSecondeModalContent = () => {
  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";
  const iconDirection = document.createElement("div");
  iconDirection.className = "iconDirection";
  const closeButton = document.createElement("div");
  const iconClose = document.createElement("i");
  iconClose.className = "fa-solid fa-xmark";
  closeButton.append(iconClose);
  const backButton = document.createElement("div");
  const iconBack = document.createElement("i");
  iconBack.className = "fa-solid fa-arrow-left";
  backButton.append(iconBack);
  iconDirection.append(backButton);
  iconDirection.append(closeButton);

  closeButton.addEventListener("click", closeModal);
  const title = document.createElement("h3");
  title.innerHTML = "Ajout photo";
  title.className = "modal-title";

  const addProjet = document.createElement("form");
  addProjet.action = "#";
  addProjet.method = "GET";
  const labelForm = document.createElement("label");
  labelForm.setAttribute("for", "titleProjet");
  labelForm.innerText = "Titre";
  const titleProjet = document.createElement("input");
  titleProjet.type = "text";
  titleProjet.id = "titleProjet";
  titleProjet.setAttribute("required", "minlength", "4");
  const labelCategorieProjet = document.createElement("label");
  labelCategorieProjet.innerText = "Catégorie";
  labelCategorieProjet.setAttribute("for", "catergorieProjet");
  const selectProjet = document.createElement("select");
  selectProjet.id = "catergorieProjet";
  const optionObjets = document.createElement("option");
  optionObjets.value = "objets";
  optionObjets.innerText = "Objets";

  const optionAppartements = document.createElement("option");
  optionAppartements.value = "appartements";
  optionAppartements.innerText = "Appartements";

  const optionHotelsRestaurants = document.createElement("option");
  optionHotelsRestaurants.value = "HotelsRestaurants";
  optionHotelsRestaurants.innerText = "Hotels & restaurants";

  addProjet.append(labelForm);
  addProjet.appendChild(titleProjet);
  addProjet.appendChild(labelCategorieProjet);
  addProjet.appendChild(selectProjet);
  selectProjet.append(optionObjets);
  selectProjet.appendChild(optionAppartements);
  selectProjet.appendChild(optionHotelsRestaurants);
  const backgroundImg = document.createElement("div");
  backgroundImg.className = "backgroundImg";
  const iconContainer = document.createElement("div");
  iconContainer.className = "iconContainer";
  const iconPicture = document.createElement("i");
  iconPicture.className = "fa-regular fa-image fa-2xl size";
  iconContainer.appendChild(iconPicture);
  const buttonAdd = document.createElement("input");
  buttonAdd.type = "file";
  buttonAdd.id = "buttonAddImg";
  const buttonAddImg = document.createElement("label");
  buttonAddImg.setAttribute("for", "buttonAddImg");
  buttonAddImg.innerHTML = "+ Ajouter photo";
  const info = document.createElement("p");
  info.innerText = "jpg, png : 4mo max";

  const line = document.createElement("div");
  line.className = "line";
  const button = document.createElement("button");
  button.innerHTML = "Valider";
  backButton.addEventListener("click", generateFirstModalContent);
  modalContent.appendChild(iconDirection);

  modalContent.appendChild(title);
  modalContent.appendChild(backgroundImg);
  backgroundImg.appendChild(iconContainer);
  backgroundImg.appendChild(buttonAddImg);
  backgroundImg.appendChild(buttonAdd);
  backgroundImg.appendChild(info);
  modalContent.appendChild(addProjet);
  modalContent.appendChild(line);
  modalContent.appendChild(button);
};

const generateEditButton = () => {
  const projet_edit = document.querySelector(".projet_edit");
  const projet_edit_div = document.createElement("div");
  const lienModal = document.createElement("a");
  lienModal.className = "button-modal";
  projet_edit.appendChild(projet_edit_div);
  projet_edit_div.append(lienModal);
  const button_edit = document.createElement("div");
  const iconEdit = document.createElement("i");
  iconEdit.className = "fa-regular fa-pen-to-square";
  lienModal.append(iconEdit);
  lienModal.append(button_edit);
  button_edit.className = " button_edit";
  button_edit.innerHTML = "Modifier";
  lienModal.addEventListener("click", openModal);
};

if (token) {
  generateLogoutButton();
  generateTopBar();
  generateEditButton();
}

/**/

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
