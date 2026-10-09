import { Todo } from "./todo.js";
import { loadManager, saveManager } from "./storage.js";
import { render } from "./ui.js";

const manager = loadManager();   // restores saved data (or starts fresh)
let editingId = null;            // null = adding a new todo, otherwise the id being edited

const dialog = document.querySelector("#todo-dialog");
const todoForm = document.querySelector("#todo-form");
const projectForm = document.querySelector("#project-form");

// One place to save + redraw after any change.
function update() {
    saveManager(manager);
    render(manager);
}

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = projectForm.elements.title.value.trim();
    if (!title) return;
    manager.createProject(title);
    projectForm.reset();
    update();
});

// ----- Todo dialog (add + edit) -----
function openDialog(todo = null) {
    editingId = todo ? todo.id : null;
    todoForm.reset();
    document.querySelector("#dialog-title").textContent = todo ? "Edit task" : "Add task";
    if (todo) {
        todoForm.elements.title.value = todo.title;
        todoForm.elements.description.value = todo.description;
        todoForm.elements.dueDate.value = todo.dueDate;
        todoForm.elements.isPriority.checked = todo.isPriority;
    }
    dialog.showModal();
}

document.querySelector("#add-todo").addEventListener("click", () => openDialog());
document.querySelector("#cancel-todo").addEventListener("click", () => dialog.close());

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = {
        title: todoForm.elements.title.value.trim(),
        description: todoForm.elements.description.value.trim(),
        dueDate: todoForm.elements.dueDate.value,
        isPriority: todoForm.elements.isPriority.checked,
    };
    if (!fields.title) return;

    if (editingId) {
        manager.currentProject.getTodo(editingId).update(fields);
    } else {
        manager.currentProject.addTodo(
            new Todo(fields.title, fields.description, fields.dueDate, fields.isPriority)
        );
    }
    dialog.close();
    update();
});

// ----- Clicks on projects and todos (event delegation) -----
document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const { action, id } = target.dataset;
    const project = manager.currentProject;

    if (action === "select-project") manager.setCurrentProject(id);
    else if (action === "delete-project") {
        if (!confirm("Delete this project and all its todos?")) return;
        manager.deleteProject(id);
    }
    else if (action === "toggle") project.getTodo(id).toggleCompleted();
    else if (action === "edit-todo") return openDialog(project.getTodo(id));
    else if (action === "delete-todo") project.removeTodo(id);
    else return;

    update();
});

render(manager); // first draw on page load