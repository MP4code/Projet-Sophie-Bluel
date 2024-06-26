const token = localStorage.getItem("token");
let worksList = [];
let categories = [];

const modal = document.querySelector(".modal");

/*** Déconnexion ***/
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

/*** Style ***/
const footer = document.querySelector("footer");
const html = document.querySelector("html");
html.appendChild(footer);

const generateTopBar = () => {
  const html = document.querySelector("html");
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
  html.insertBefore(topBar, html.firstChild);
};

/*** Modal ***/
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

const deleteWork = async (id) => {
  console.log(id);

  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (response.ok) {
    console.log("projet supp");
    await getWorks();
    generateFirstModalContent();
  } else {
    console.log(response);
  }
};

/*** Première Modal ***/

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
    trash.addEventListener("click", () => deleteWork(worksList[i].id));
    const iconTrash = document.createElement("i");
    iconTrash.className = "fa-solid fa-trash-can trashButton";
    trash.appendChild(iconTrash);
    galleryModal.append(trash);
    trashImg.append(trash);
  }

  const buttonAdd1 = document.createElement("button");
  buttonAdd1.innerHTML = "Ajouter une photo";
  buttonAdd1.className = "buttonAdd1";
  buttonAdd1.addEventListener("click", generateSecondeModalContent);
  modalContent.appendChild(title);
  modalContent.appendChild(galleryModalContainer);
  modalContent.appendChild(galleryModal);
  modalContent.appendChild(line);
  modalContent.appendChild(buttonAdd1);
  modalContent.appendChild(closeButton);
  galleryModalContainer.append(galleryModal);
};

/*** Ajouter un projet ***/

const addWork = async () => {
  const titleProjet = document.querySelector("#titleProjet").value;
  const selectProjet = document.querySelector("#catergorieProjet").value;
  const buttonAdd = document.querySelector("#buttonAddImg").files[0];

  if (!buttonAdd || !titleProjet) {
    return alert("Veuillez enter tous les champs du formulaire.");
  }
  const formData = new FormData();
  formData.append("image", buttonAdd);
  formData.append("title", titleProjet);
  formData.append("category", selectProjet);

  const response = await fetch(`http://localhost:5678/api/works/`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  if (response.ok) {
    console.log("projet add");
    await getWorks();
    generateSecondeModalContent();
  } else {
    console.log(response);
  }
};

/*** Seconde Modal ***/

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
  buttonAdd.accept = ".jpg , .png";
  const buttonAddImgLabel = document.createElement("label");
  buttonAddImgLabel.className = "buttonAddImgLabel";
  buttonAddImgLabel.setAttribute("for", "buttonAddImg");
  const buttonAddImg = document.createElement("div");
  buttonAddImg.className = "buttonAddImgContent";
  buttonAddImg.appendChild(iconContainer);
  const buttontext = document.createElement("span");
  buttontext.className = "buttonAdd-label";
  buttontext.innerHTML = "+ Ajouter photo";
  buttonAddImg.appendChild(buttontext);
  const info = document.createElement("p");
  info.innerText = "jpg, png : 4mo max";

  buttonAddImgLabel.appendChild(buttonAddImg);
  backgroundImg.appendChild(buttonAddImgLabel);
  backgroundImg.appendChild(buttonAdd);

  buttonAddImg.appendChild(info);
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
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.value = categories[i].id;
    option.innerText = categories[i].name;
    selectProjet.append(option);
  }

  addProjet.appendChild(backgroundImg);
  addProjet.appendChild(labelForm);
  addProjet.appendChild(titleProjet);
  addProjet.appendChild(labelCategorieProjet);
  addProjet.appendChild(selectProjet);

  /**/

  const line = document.createElement("div");
  line.className = "line";
  const buttonValidate = document.createElement("button");
  buttonValidate.innerHTML = "Valider";
  buttonValidate.className = "buttonValidate";
  backButton.addEventListener("click", generateFirstModalContent);

  modalContent.appendChild(iconDirection);
  modalContent.appendChild(title);
  modalContent.appendChild(addProjet);
  modalContent.appendChild(line);
  modalContent.appendChild(buttonValidate);

  /*** Prévisualisation de l'image du projet ***/

  const testImg = () => {
    const dataImg = buttonAdd.files[0];
    const buttonAddImg = document.querySelector(".buttonAddImgLabel");
    const buttonAddImgContent = document.querySelector(".buttonAddImgContent");

    buttonAddImgContent.style.display = "none";
    const imgPrevious = document.createElement("img");
    imgPrevious.className = "imgPrevious";
    imgPrevious.src = window.URL.createObjectURL(dataImg);
    buttonAddImg.appendChild(imgPrevious);

    if (dataImg && titleProjet.value) {
      buttonValidate.className = "buttonValidate_ok";
    }
  };

  const testTitle = () => {
    const dataImg = buttonAdd.files[0];

    if (dataImg && titleProjet.value) {
      buttonValidate.className = "buttonValidate_ok";
    }
  };

  buttonAdd.addEventListener("change", testImg);
  titleProjet.addEventListener("change", testTitle);
  buttonValidate.addEventListener("click", addWork);
};

/*** Le bouton modifier ***/

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

/*** Si le token est présent les fonctions se lancent
 * La fonction pour se déconnecter
 * La fonction pour la barre du haut apparaît
 * La fonction pour le bouton modifier
 * ***/

if (token) {
  generateLogoutButton();
  generateTopBar();
  generateEditButton();
}

/*** Afficher les projets ***/

const getWorks = async () => {
  await fetch("http://localhost:5678/api/works", {
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

/*** Trier en focntion des catégories ***/

const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories", {
    method: "GET",
  });
  if (response.ok) {
    categories = await response.json();

    if (!token) {
      displayCategories();
    }
  }
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
