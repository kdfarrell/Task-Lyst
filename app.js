const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const themeSwitch = document.querySelector("#theme-switch");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
   e.preventDefault();
   addTodo();
});

// Todo Functions
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = { text: todoText, completed: false };
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoList.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoList.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" />
        <label class="custom-checkbox" for="${todoId}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">${todo.text}</label>
        <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
        </button>
    `;
    
    const deleteButton = todoLI.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => deleteTodoItem(todoIndex));

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

// Storage Functions
function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

// Light Mode Functions
function enableLightMode() {
    document.body.classList.add('light-mode');
    localStorage.setItem('lightmode', 'active');
}

function disableLightMode() {
    document.body.classList.remove('light-mode');
    localStorage.setItem('lightmode', 'null');
}

let lightmode = localStorage.getItem('lightmode');
if (lightmode === "active") {
    enableLightMode();
}

themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem('lightmode');
    if (lightmode !== "active") {
        enableLightMode();
    } else {
        disableLightMode();
    }
});
