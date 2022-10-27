export default function renderToDosArea(project) {
  let toDosAreaDiv = document.createElement("div");
  toDosAreaDiv.classList.add("todos-area-div");

  for (let item of project.toDos) {
    console.log(item);
    toDosAreaDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="todo-item">${item.title}</div>`
    );
  }

  return toDosAreaDiv;
}
