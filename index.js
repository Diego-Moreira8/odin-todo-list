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

const allProjects = {
  projectsArray: [new Project("default")],

  addProject() {
    allProjects.projectsArray.push(new Project("Novo Projeto"));
    renderMenu();
  },

  removeProject(index) {
    this.projectsArray.splice(index, 1);
  },
};

function renderMenu() {
  //updateLocalStorage();

  const menuDiv = document.querySelector("#menu");

  // Clear menu and add the default project button------------------------------
  menuDiv.innerHTML = `<div data-project-index=0>
    <button class="project" id="default-project">Notas</button>
  </div>`;

  // Create buttons with allProjects.projectsArray, except the default----------
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

  // Create ADD PROJECT button -------------------------------------------------
  menuDiv.insertAdjacentHTML(
    "beforeend",
    `<button id="add-project">+</button>`
  );

  // Function for add project---------------------------------------------------
  menuDiv.querySelector("#add-project").addEventListener("click", () => {
    allProjects.addProject();
    renderMenu();
    // Render new project (last of the array)
    renderToDosArea(
      allProjects.projectsArray[allProjects.projectsArray.length - 1]
    );
  });

  // Function to the projects buttons ------------------------------------------
  // Render the todos of the project
  const projectButtons = menuDiv.querySelectorAll(".project");
  projectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Read the div's index attribute to render it
      const index = e.target.parentElement.getAttribute("data-project-index");
      renderToDosArea(allProjects.projectsArray[index]);
    });
  });

  // Event listener to the rename project buttons-------------------------------
  const renameProjectButtons = menuDiv.querySelectorAll(".rename-project");
  renameProjectButtons.forEach((button) => {
    button.addEventListener("click", renameProject);
  });

  // Function to the rename project buttons-------------------------------------
  // Change the project div to a rename form
  function renameProject(e) {
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
    // Function for apply change on submit
    parent.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      // Read the div's attribute
      const index = e.target.parentElement.getAttribute("data-project-index");
      const selectedProject = allProjects.projectsArray[index];
      // Rename the project with the input value and render again
      selectedProject.name = e.target[0].value;
      renderMenu();
      // Render Todos if i'm on the renamed project, to load the new title
      if (currentProject === selectedProject) renderToDosArea(selectedProject);
    });
    // Function to the cancel button
    parent.querySelector(".cancel-rename").addEventListener("click", () => {
      renderMenu(); // Just render again
    });
  }

  // Function to the remove project buttons-------------------------------------
  // Delete project and render again on double click
  const removeProjectButtons = menuDiv.querySelectorAll(".remove-project");
  removeProjectButtons.forEach((button) => {
    button.addEventListener("dblclick", (e) => {
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
}

function renderToDosArea(project) {
  updateLocalStorage();
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
      `<div class="todo-item" data-todo-index="${project.toDos.indexOf(item)}">
        <div>
          <input type="checkbox" ${item.checked ? "checked" : ""} /> 
          <input type="text" value="${item.title}" class="title" 
          placeholder="Insira um título aqui"/>
          <input type="date" value="${item.dueDate}" class="due-date">
          <button type="button" class="priority">${item.priority}</button>
          <button type="button" class="remove-todo">X</button>
        </div>
        <div>
          <textarea class="description">${item.description}</textarea>
        </div>
      </div>`
    );
  }

  // Button for add to do item
  toDosAreaDiv.insertAdjacentHTML(
    "beforeend",
    `<button type="button" id="add-todo-item">+</button>`
  );
  // Event for add button
  toDosAreaDiv.querySelector("#add-todo-item").addEventListener("click", () => {
    // Variables with current day for the backticks
    const y = new Date().getFullYear(),
      m = new Date().getMonth() + 1,
      d = new Date().getDate();

    currentProject.addToDoItem(
      "",
      "",
      `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`,
      1,
      false
    );

    renderToDosArea(currentProject);
  });

  // Add event listener to the checkboxes
  toDosAreaDiv.querySelectorAll("[type='checkbox']").forEach((box) => {
    box.addEventListener("change", (e) => {
      // Read the div (parent parent element) index
      const index =
        e.target.parentElement.parentElement.getAttribute("data-todo-index");
      // Change the checked status to the checkbox value
      currentProject.toDos[index].checked = e.target.checked;

      renderToDosArea(currentProject);
    });
  });

  // Add event listener to the priority togglers
  toDosAreaDiv.querySelectorAll(".priority").forEach((button) => {
    button.addEventListener("click", (e) => {
      // Read the div (parent parent element) index
      const index =
        e.target.parentElement.parentElement.getAttribute("data-todo-index");
      // Change priority from 1 to 3
      if (currentProject.toDos[index].priority < 3)
        currentProject.toDos[index].priority++;
      else currentProject.toDos[index].priority = 1;

      renderToDosArea(currentProject);
    });
  });

  // Add event listener on due date input
  toDosAreaDiv.querySelectorAll(".due-date").forEach((input) => {
    input.addEventListener("change", (e) => {
      // Read the div (parent parent element) index
      const index =
        e.target.parentElement.parentElement.getAttribute("data-todo-index");
      // Change priority from 1 to 3
      currentProject.toDos[index].dueDate = e.target.value;

      renderToDosArea(currentProject);
    });
  });

  // Add event listener on title input
  toDosAreaDiv.querySelectorAll(".title").forEach((input) => {
    input.addEventListener("change", (e) => {
      // Read the div (parent parent element) index
      const index =
        e.target.parentElement.parentElement.getAttribute("data-todo-index");

      currentProject.toDos[index].title = e.target.value;

      renderToDosArea(currentProject);
    });
  });

  // Add event listener on description textarea
  toDosAreaDiv.querySelectorAll(".description").forEach((textarea) => {
    textarea.addEventListener("change", (e) => {
      // Read the div (parent parent element) index
      const index =
        e.target.parentElement.parentElement.getAttribute("data-todo-index");

      currentProject.toDos[index].description = e.target.value;

      renderToDosArea(currentProject);
    });
  });

  // Add event listener on remove buttons (double click)
  toDosAreaDiv.querySelectorAll(".remove-todo").forEach((btn) => {
    btn.addEventListener("dblclick", (e) => {
      // Read the div (parent parent element) index
      const index =
        e.target.parentElement.parentElement.getAttribute("data-todo-index");

      currentProject.removeToDoItem(index);

      renderToDosArea(currentProject);
    });
  });
}

function updateLocalStorage() {
  localStorage.clear();

  // Load the name of every project to create the localStorage key
  for (let project of allProjects.projectsArray) {
    if (project.toDos.length === 0) {
      // Save a empty value if there is no todo items
      localStorage.setItem(project.name, "");
    } else {
      // Load every todo item and save as a key
      for (let item of project.toDos) {
        localStorage.setItem(project.name, JSON.stringify(item));
      }
    }
  }
}

(function getLocalStorage() {
  //console.log();
})();

// Initialize Menu
renderMenu();

// Initialize on Default
let currentProject = allProjects.projectsArray[0];
renderToDosArea(currentProject);
