class Project {
  constructor(name) {
    this.name = name;
    this.toDos = []; // Stores all todo-items objects
  }

  getToDos() {
    return this.toDos;
  }

  addToDoItem(title, description, dueDate, priority, checked) {
    this.toDos.push({ title, description, dueDate, priority, checked });
  }

  removeToDoItem(index) {
    this.toDos.splice(index, 1);
  }
}

function renderMenu() {
  let menuDiv = document.createElement("div");

  for (let project of projects) {
    menuDiv.insertAdjacentHTML(
      "beforeend",
      `<button class="project" data-project-index=${projects.indexOf(
        project
      )}>${project.name}</button>`
    );
  }

  // Adding event listeners
  const menuButtons = menuDiv.querySelectorAll(".project");
  menuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-project-index");
      renderToDosArea(projects[index]);
    });
  });

  return menuDiv;
}

function renderToDosArea(project) {
  let toDosAreaDiv = document.createElement("div");
  toDosAreaDiv.classList.add("todos-area-div");

  for (let item of project.toDos) {
    toDosAreaDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="todo-item">${item.title}</div>`
    );
  }

  return toDosAreaDiv;
}

const projects = [
  new Project("default"),
  new Project("Teste 1"),
  new Project("Teste 2"),
];
projects[0].addToDoItem("Fazer compras", "Descrição", "28/10/22", false);
projects[0].addToDoItem("Limpar mesa", "Descrição", "26/10/22", true);
projects[1].addToDoItem("Lavar louças", "Descrição", "28/10/22", false);
projects[1].addToDoItem("Tomar banho", "Descrição", "28/10/22", false);
projects[1].addToDoItem("Estudar", "Descrição", "28/10/22", false);

const menuDiv = document.querySelector("#menu");
menuDiv.appendChild(renderMenu());

const toDosAreaDiv = document.querySelector("#todos-area-div");
