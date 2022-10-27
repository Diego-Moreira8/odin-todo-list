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

  removeProject(index) {
    this.projectsArray.splice(index, 1);
  },
};

allProjects.projectsArray.push(new Project("Teste 3"));

allProjects.projectsArray[0].addToDoItem(
  "Fazer compras",
  "Descrição",
  "28/10/22",
  1,
  false
);
allProjects.projectsArray[0].addToDoItem(
  "Limpar mesa",
  "Descrição",
  "26/10/22",
  1,
  true
);
allProjects.projectsArray[1].addToDoItem(
  "Lavar louças",
  "Descrição",
  "28/10/22",
  1,
  false
);
allProjects.projectsArray[1].addToDoItem(
  "Tomar banho",
  "Descrição",
  "28/10/22",
  1,
  false
);
allProjects.projectsArray[1].addToDoItem(
  "Estudar",
  "Descrição",
  "28/10/22",
  1,
  false
);
allProjects.projectsArray[3].addToDoItem(
  "Pescar",
  "Descrição",
  "28/10/22",
  1,
  false
);
// Tests ------------------------------------------------------------------

function renderMenu() {
  const menuDiv = document.querySelector("#menu");

  // Clear menu and add the default project button
  menuDiv.innerHTML = `<div data-project-index=0>
    <button class="project">Notas</button>
  </div>`;

  // Create buttons with allProjects.projectsArray, except the default
  for (let i = 1; i < allProjects.projectsArray.length; i++) {
    menuDiv.insertAdjacentHTML(
      "beforeend",
      `<div data-project-index=${i}>
        <button class="project">
          ${allProjects.projectsArray[i].name}
        </button>
        <button class="rename-project">Rename</button>
        <button class="remove-project">X</button>
      </div>`
    );
  }

  // Adding event listeners to the projects buttons
  const projectButtons = menuDiv.querySelectorAll(".project");
  projectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Read the div's attribute
      const index = e.target.parentElement.getAttribute("data-project-index");
      renderToDosArea(allProjects.projectsArray[index]);
    });
  });

  // Adding event listeners to the remove project buttons
  const removeProjectButtons = menuDiv.querySelectorAll(".remove-project");
  removeProjectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Read the div's attribute
      const index = e.target.parentElement.getAttribute("data-project-index");
      // Render default project if current project is removed
      if (allProjects.projectsArray[index] === currentProject) {
        renderToDosArea(allProjects.projectsArray[0]);
      }
      allProjects.removeProject(index);
      renderMenu();
    });
  });

  // Adding event listeners to the rename project buttons
  const renameProjectButtons = menuDiv.querySelectorAll(".rename-project");
  renameProjectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Take the div (parent element)
      const parent = e.target.parentElement;
      // Replace the buttons with a rename field
      parent.innerHTML = `
        <form>
          <input type="text" />
          <button type="submit">OK</button>
          <button type="button" class="cancel-rename">X</button>
        <form>
      `;
      // Add submit event listener
      parent.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        // Read the div's attribute
        const index = e.target.parentElement.getAttribute("data-project-index");
        // Rename the project with the input value
        allProjects.projectsArray[index].name = e.target[0].value;
        renderMenu();
      });
      // Add event listener to the cancel button
      parent.querySelector(".cancel-rename").addEventListener("click", () => {
        renderMenu(); // Just render again
      });
    });
  });

  // Create ADD PROJECT button
  const addProjectBtn = document.createElement("button");
  addProjectBtn.textContent = "+";
  addProjectBtn.id = "add-project";
  addProjectBtn.addEventListener("click", allProjects.addProject);
  menuDiv.appendChild(addProjectBtn);
}

function renderToDosArea(project) {
  currentProject = project;

  const toDosAreaDiv = document.querySelector("#todos-area-div");

  // Start rendering with the project title
  if (currentProject === allProjects.projectsArray[0])
    toDosAreaDiv.innerHTML = `<h2>Notas</h2>`; // If default project
  else toDosAreaDiv.innerHTML = `<h2>${project.name}</h2>`;

  // Render each todo item
  for (let item of project.toDos) {
    toDosAreaDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="todo-item">
        <div>
          ${item.priority} |
          <input type="checkbox" ${item.checked ? "checked" : ""} /> 
          ${item.checked} |
          <strong>${item.title}</strong> | 
          ${item.dueDate}
        </div>
        <div>${item.description}</div>
      </div>`
    );
  }
}

// Initialize Menu
renderMenu();

// Initialize on Default
let currentProject;
renderToDosArea(allProjects.projectsArray[0]);
