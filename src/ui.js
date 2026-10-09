// Everything that touches the page lives here. It only draws; it never changes data.

const $ = (selector) => document.querySelector(selector);

// Small helper: make an element with a class, text and data-attributes.
function el(tag, cls = "", text = "", data = {}) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    node.textContent = text;
    Object.assign(node.dataset, data);
    return node;
}

function formatDate(dateString) {
    if (!dateString) return "No due date";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function render(manager) {
    renderProjects(manager);
    renderTodos(manager);
}

function renderProjects(manager) {
    const list = $("#project-list");
    list.replaceChildren();

    manager.projects.forEach((project, index) => {
        const item = el("li", "project" + (project === manager.currentProject ? " is-active" : ""));
        item.append(el("button", "project__name", project.title, { action: "select-project", id: project.id }));
        item.append(el("span", "project__count", String(project.todos.length)));

        if (index > 0) { // index 0 is the default project, which can't be deleted
            const del = el("button", "icon-btn", "\u00d7", { action: "delete-project", id: project.id });
            del.setAttribute("aria-label", `Delete project ${project.title}`);
            item.append(del);
        }
        list.append(item);
    });
}

function renderTodos(manager) {
    const project = manager.currentProject;
    $("#project-title").textContent = project.title;

    const list = $("#todo-list");
    list.replaceChildren();

    if (!project.todos.length) {
        list.append(el("li", "empty", "No todos yet. Add one to get started."));
        return;
    }

    project.todos.forEach((todo) => {
        const item = el("li", "todo" + (todo.isCompleted ? " is-done" : "") + (todo.isPriority ? " is-priority" : ""));

        const check = el("input", "todo__check", "", { action: "toggle", id: todo.id });
        check.type = "checkbox";
        check.checked = todo.isCompleted;
        check.setAttribute("aria-label", `Mark "${todo.title}" complete`);

        // <details> gives us expand/collapse for free
        const details = el("details", "todo__details");
        const summary = el("summary", "todo__summary");
        summary.append(el("span", "todo__title", todo.title), el("span", "todo__due", formatDate(todo.dueDate)));

        const body = el("div", "todo__body");
        body.append(el("p", "", todo.description || "No description."));
        const actions = el("div", "todo__actions");
        actions.append(
            el("button", "link", "Edit", { action: "edit-todo", id: todo.id }),
            el("button", "link link--danger", "Delete", { action: "delete-todo", id: todo.id })
        );
        body.append(actions);

        details.append(summary, body);
        item.append(check, details);
        list.append(item);
    });
}