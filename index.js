import renderHeader from "./ui-header.js";
import renderMenu from "./ui-menu.js";
import renderToDosArea from "./ui-todos-area.js";
import { projects } from "./project-class.js";

projects[0].addToDoItem(
  "Fazer compras",
  "Compras pra semana",
  "27/10/2022",
  1,
  true
);
projects[0].addToDoItem("Limpar Mesa", "", "27/10/2022", 1, true);

const content = document.querySelector("#content");
content.appendChild(renderHeader());

content.appendChild(renderMenu());
const projectButtons = document.querySelectorAll(".project");
projectButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-project-index");
    content.appendChild(renderToDosArea(projects[index]));
  });
});

content.appendChild(renderToDosArea(projects[0]));
