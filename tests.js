// TESTES ----------

console.log(projects);
console.log(projects[0].getToDos());

projects[0].addToDoItem(
  "Fazer compras",
  "Compras pra semana",
  "27/10/2022",
  1,
  true
);
projects[0].addToDoItem(
  "Estudar",
  "Estudar JavaScript",
  "30/10/2022",
  1,
  false
);
projects[0].addToDoItem("Limpar Mesa", "", "10/10/2022", 3, true);

console.log(projects[0].getToDos());

projects.push(new Project("Teste"));

console.log(projects[1].getToDos());

projects[1].addToDoItem(
  "Estudar",
  "Estudar JavaScript",
  "30/10/2022",
  1,
  false
);
projects[1].addToDoItem("Limpar Mesa", "", "10/10/2022", 3, true);

console.log(projects[1].getToDos());
