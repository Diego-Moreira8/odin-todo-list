export default function renderHeader() {
  let header = document.createElement("header");

  header.insertAdjacentHTML("afterbegin", `<h1>ToDo List</h1>`);

  return header;
}
