const getWorks = () => {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const gallery = document.querySelector(".gallery");
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
      }
    });
};
getWorks();

let filter = document.querySelector(".filter");
let tous = document.querySelector("#tous");
let objets = document.querySelector("#objets");

objets.addEventListener("click", function () {
  objets.className = "filter_selected";
});
