let worksList = [];
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
      let filter = document.querySelector(".filter");
      data.push({ id: 0, name: "Tous" });
      data.sort((a, b) => a.id - b.id);
      for (let i = 0; i < data.length; i++) {
        const input = document.createElement("input");
        input.type = "button";
        if (data[i].id === 0) {
          input.className = "filter_button filter_selected";
        } else {
          input.className = "filter_button filter_not_selected";
        }
        input.id = data[i].id;
        input.value = data[i].name;
        input.addEventListener("click", () => displayWorks(data[i].id));
        filter.appendChild(input);
      }
    });
};
getCategories();

/*Alert Login*/

let email = document.querySelector("#email");

let submit = document.querySelector("#submit");
/*
const alert = () => {
  submit.addEventListener(
    "click",
  )
    console.log("test")
  );
};
*/

let dataUsers = [];
const userLogin = () => {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
  })
    .then((res) => res.json())
    .then("users");
};

userLogin();
