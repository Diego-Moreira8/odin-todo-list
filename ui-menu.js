import { projects } from "./project-class.js";

export default function renderMenu() {
  let menuDiv = document.createElement("div");

  for (let project of projects) {
    menuDiv.insertAdjacentHTML(
      "beforeend",
      `<button class="project">${project.name}</button>`
    );
  }

  return menuDiv;
}
