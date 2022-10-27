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

// Tests ------------------------------------------------------------------
const allProjects = {
  projectsArray: [
    new Project("default"),
    new Project("Teste 1"),
    new Project("Teste 2"),
  ],

  addProject() {
    allProjects.projectsArray.push(new Project("Novo Projeto"));
    renderMenu();
  },

  removeProject() {
    alert("Remove Project");
  },
};

allProjects.projectsArray.push(new Project("Teste 3"));

allProjects.projectsArray[0].addToDoItem(
  "Fazer compras",
  "Descrição",
  "28/10/22",
  false
);
allProjects.projectsArray[0].addToDoItem(
  "Limpar mesa",
  "Descrição",
  "26/10/22",
  true
);
allProjects.projectsArray[1].addToDoItem(
  "Lavar louças",
  "Descrição",
  "28/10/22",
  false
);
allProjects.projectsArray[1].addToDoItem(
  "Tomar banho",
  "Descrição",
  "28/10/22",
  false
);
allProjects.projectsArray[1].addToDoItem(
  "Estudar",
  "Descrição",
  "28/10/22",
  false
);
allProjects.projectsArray[3].addToDoItem(
  "Pescar",
  "Descrição",
  "28/10/22",
  false
);
// Tests ------------------------------------------------------------------

function renderMenu() {
  const menuDiv = document.querySelector("#menu");
  menuDiv.innerHTML = "";

  for (let project of allProjects.projectsArray) {
    menuDiv.insertAdjacentHTML(
      "beforeend",
      `<button class="project" data-project-index=${allProjects.projectsArray.indexOf(
        project
      )}>${project.name}</button>`
    );
  }

  // Adding event listeners to the projects buttons
  const menuButtons = menuDiv.querySelectorAll(".project");
  menuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-project-index");
      renderToDosArea(allProjects.projectsArray[index]);
    });
  });

  // Create ADD PROJECT button
  const addProjectBtn = document.createElement("button");
  addProjectBtn.textContent = "+";
  addProjectBtn.id = "add-project";
  addProjectBtn.addEventListener("click", allProjects.addProject);
  menuDiv.appendChild(addProjectBtn);

  return menuDiv;
}

function renderToDosArea(project) {
  const toDosAreaDiv = document.querySelector("#todos-area-div");
  toDosAreaDiv.innerHTML = "";

  for (let item of project.toDos) {
    toDosAreaDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="todo-item">${item.title}</div>`
    );
  }

  return toDosAreaDiv;
}

// Initialize Menu
const menuDiv = document.querySelector("#menu");
menuDiv.appendChild(renderMenu());

// Initialize on Default
renderToDosArea(allProjects.projectsArray[0]);
