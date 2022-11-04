class Project {
  constructor(name) {
    this.name = name;
    this.toDos = []; // Stores all todo-items objects
  }

  addToDoItem(title, description, dueDate, priority, checked) {
    this.toDos.push({ title, description, dueDate, priority, checked });
  }

  removeToDoItem(index) {
    this.toDos.splice(index, 1);
  }
}

const allProjects = {
  projectsArray: [new Project("default")], // Array with default project

  addProject(name) {
    allProjects.projectsArray.push(new Project(name));
  },

  removeProject(index) {
    this.projectsArray.splice(index, 1);
  },
};

function renderMenu() {
  updateLocalStorage();

  const projectsDiv = document.querySelector("#user-projects");

  // Clear user projects -------------------------------------------------------
  projectsDiv.innerHTML = "";

  // Create buttons with allProjects.projectsArray, except the default----------
  for (let i = 1; i < allProjects.projectsArray.length; i++) {
    projectsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="project" data-project-index=${i}>
        <button class="project-name">
          ${allProjects.projectsArray[i].name}
        </button>
        <button class="rename-project material-symbols-outlined">
          drive_file_rename_outline
        </button>
        <button class="remove-project material-symbols-outlined">
          delete
        </button>
      </div>`
    );
  }

  // Function to the projects buttons ------------------------------------------
  // Render the todos of the project
  const projectButtons = document.querySelectorAll(".project");
  projectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.id === "default-project") {
        renderToDosArea(allProjects.projectsArray[0]);
      } else {
        // Read the div's index attribute to render it
        const index = e.target.parentElement.getAttribute("data-project-index");
        renderToDosArea(allProjects.projectsArray[index]);
      }
    });
  });

  // Event listener to the rename project buttons-------------------------------
  const renameProjectButtons = projectsDiv.querySelectorAll(".rename-project");
  renameProjectButtons.forEach((button) => {
    button.addEventListener("click", renameProject);
  });

  // Function to the rename project buttons-------------------------------------
  // Change the project div to a rename form
  function renameProject(e) {
    // Take the div (parent element)
    const parent = e.target.parentElement;
    // Read the div's attribute
    const index = parent.getAttribute("data-project-index");
    // For css
    parent.classList.add("renaming");
    // Replace the buttons with a rename field
    parent.innerHTML = `
        <form>
          <input type="text" value="${allProjects.projectsArray[index].name}"
          required />
          <button type="submit">OK</button>
          <button type="button" class="cancel-rename">X</button>
        <form>
      `;

    parent.querySelector("input").focus();

    // Function for apply change on submit
    parent.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      // Verify if already exists a project with that name
      let isUnique = true;
      for (let project of allProjects.projectsArray) {
        if (e.target[0].value === project.name) {
          isUnique = false;
        }
      }

      if (isUnique) {
        const selectedProject = allProjects.projectsArray[index];
        // Rename the project with the input value and render again
        selectedProject.name = e.target[0].value;
        renderMenu();
        // Render Todos if i'm on the renamed project, to load the new title
        if (currentProject === selectedProject)
          renderToDosArea(selectedProject);
      } else {
        alert("Já existe um projeto com este nome!");
      }
    });

    // Function to the cancel button
    parent.querySelector(".cancel-rename").addEventListener("click", () => {
      renderMenu(); // Just render again
    });
  }

  // Function to the remove project buttons-------------------------------------
  // Delete project and render again on double click
  const removeProjectButtons = projectsDiv.querySelectorAll(".remove-project");
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

  // Render title --------------------------------------------------------------
  if (currentProject.name === "default")
    document.querySelector("#current-project").innerHTML = "Notas";
  else
    document.querySelector(
      "#current-project"
    ).innerHTML = `<h2>${currentProject.name}</h2>`;

  const toDosAreaDiv = document.querySelector("#todo-items");

  // Clear to dos div ----------------------------------------------------------
  toDosAreaDiv.innerHTML = "";

  // Render each todo item------------------------------------------------------
  for (let item of project.toDos) {
    toDosAreaDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="todo-item" data-todo-index="${project.toDos.indexOf(item)}">
        <div>
          <input type="checkbox" ${item.checked ? "checked" : ""} /> 
          <input type="text" value="${item.title}" class="title" 
          placeholder="Insira um título aqui"/>
          <input type="date" value="${item.dueDate}" class="dueDate">
          <button type="button" class="priority">${item.priority}</button>
          <button type="button" class="remove-todo">X</button>
        </div>
        <div>
          <textarea class="description">${item.description}</textarea>
        </div>
      </div>`
    );
  }

  // Button for add to do item--------------------------------------------------
  toDosAreaDiv.insertAdjacentHTML(
    "beforeend",
    `<button type="button" id="add-todo-item">+</button>`
  );
  // Function for the add button
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

  // Function for the checkboxes -----------------------------------------------
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

  // Add event listener to the priority togglers--------------------------------
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

  // Function for title, due date and description changes-----------------------
  function applyToDoChanges(e) {
    // Read the div's (parent parent element) index
    const index =
      e.target.parentElement.parentElement.getAttribute("data-todo-index");

    // Read the input class
    const input = e.target.classList[0];

    currentProject.toDos[index][input] = e.target.value;
    renderToDosArea(currentProject);
  }

  // Add event listener on due date input---------------------------------------
  toDosAreaDiv.querySelectorAll(".dueDate").forEach((input) => {
    input.addEventListener("change", applyToDoChanges);
  });

  // Add event listener on title input------------------------------------------
  toDosAreaDiv.querySelectorAll(".title").forEach((input) => {
    input.addEventListener("change", applyToDoChanges);
  });

  // Add event listener on description textarea---------------------------------
  toDosAreaDiv.querySelectorAll(".description").forEach((textarea) => {
    textarea.addEventListener("change", applyToDoChanges);
  });

  // Add event listener on remove buttons (double click)------------------------
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

(function syncWithLocalStorage() {
  if (localStorage.length === 0) return "localStorage is empty";
  // Create projects with the names from projectsNames key in localStorage -----
  const projectsNames = JSON.parse(localStorage.getItem("projectsNames"));
  for (let name of projectsNames) {
    if (name === "default") continue; // Skip default
    allProjects.addProject(name);
  }

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === "projectsNames") continue;
    for (let project of allProjects.projectsArray) {
      if (localStorage.key(i) !== project.name) continue;
      else {
        project.toDos = JSON.parse(localStorage.getItem(localStorage.key(i)));
      }
    }
  }
})();

function updateLocalStorage() {
  localStorage.clear();

  // Save only projects names in the right position ----------------------------
  let projectsNames = [];
  for (let project of allProjects.projectsArray) {
    projectsNames.push(project.name);
  }
  localStorage.setItem("projectsNames", JSON.stringify(projectsNames));

  // Save only projects to dos -------------------------------------------------
  for (let project of allProjects.projectsArray) {
    localStorage.setItem(project.name, JSON.stringify(project.toDos));
  }
}

let currentProject = allProjects.projectsArray[0];
(function init() {
  // Initialize Menu
  renderMenu();

  // Add function for Default Project Button
  document
    .querySelector("#default-project button")
    .addEventListener("click", () => {
      renderToDosArea(allProjects.projectsArray[0]);
    });

  // Initialize on Default
  renderToDosArea(currentProject);
})();

(function addProjectButton() {
  // Create/recreate add project button
  document.querySelector("#add-project").innerHTML =
    "<button>Novo projeto</button>";

  // Function for add project---------------------------------------------------
  document
    .querySelector("#add-project button")
    .addEventListener("click", (e) => {
      // Take the div (parent element)
      const parent = e.target.parentElement;
      // Replace the button with a rename field
      parent.innerHTML = `<form>
          <input type="text" placeholder="Nome do projeto" 
          required />
          <button type="submit" class="material-symbols-outlined">
            done
          </button>
          <button type="button" class="cancel-add material-symbols-outlined">
            close
          </button>
        <form>`;

      parent.querySelector("input").focus();

      // Function for add project on submit
      parent.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();

        // Verify if already exists a project with that name
        let isUnique = true;
        for (let project of allProjects.projectsArray) {
          if (e.target[0].value === project.name) {
            isUnique = false;
          }
        }

        if (isUnique) {
          allProjects.addProject(e.target[0].value);
          renderMenu();
          addProjectButton();
          // Render new project (last of the array)
          renderToDosArea(
            allProjects.projectsArray[allProjects.projectsArray.length - 1]
          );
        } else {
          alert("Já existe um projeto com este nome!");
        }
      });

      // Function for cancel add
      parent.querySelector(".cancel-add").addEventListener("click", () => {
        addProjectButton();
      });
    });
})();
