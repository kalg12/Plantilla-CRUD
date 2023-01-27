const createTask = (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const task = {
    title,
    description,
  };

  if (localStorage.getItem("todoList") === null) {
    //Creamos una nueva lista de elementos
    let todoList = [];
    //Añadimos el nuevo elemento a la lista
    todoList.push(task);
    //Guardamos la lista en el localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  //Si ya existe la lista de elementos
  else {
    //Obtenemos la lista de elementos
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    //Añadimos el nuevo elemento a la lista
    todoList.push(task);
    //Guardamos la lista en el localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  //Limpiamos el formulario
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  //Renderiza las tareas en el html
  renderTodoList();
};

const renderTodoList = () => {
  const todoList = JSON.parse(localStorage.getItem("todoList"));
  let todoListContainer = document.getElementById("tasks");
  /* Por cada elemento en nuestro array todoList vamos a renderizar la etiqueta <tr>*/
  todoListContainer.innerHTML = "";
  todoList.forEach((task) => {
    const title = task.title;
    const description = task.description;

    todoListContainer.innerHTML += `<tr>
        <td>${title}</td>
        <td>${description}</td>
        <td>
        <button class="button is-warning is-small" onclick="editTask('${title}')">Actualizar</button>
        <button class="button is-danger is-small" onclick="deleteTask('${title}')">Eliminar</button>
        </td>
      </tr>`;
  });
};

/* Creamos una función que al cargar el sitio lea el localstorage de nombre todoList y si el arreglo tiene objetos, renderizarlos */

const loadTodoList = () => {
  const todoList = JSON.parse(localStorage.getItem("todoList"));
  console.log(todoList);
  if (todoList) {
    renderTodoList();
  }
};

loadTodoList();

/* Función para eliminar tarea */

const deleteTask = (title) => {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList = todoList.filter((task) => task.title !== title);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
};

/* Función para editar tarea */

const editTask = (title) => {
  let todoList = JSON.parse(localStorage.getItem("todoList"));

  // Buscar la tarea a editar
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].title === title) {
      // Actualizar la tarea con los nuevos valores
      todoList[i].title = document.getElementById("title").value;
      todoList[i].description = document.getElementById("description").value;
      break;
    }
  }

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  // Actualizar el local storage con la lista actualizada
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
};
