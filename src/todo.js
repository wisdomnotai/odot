const createId = () => {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
        return globalThis.crypto.randomUUID();
    }
    return `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

// A single todo item.
export class Todo {
    constructor(title, description = "", dueDate = "", isPriority = false, isCompleted = false, id = createId()) {
        this.id = id;                 // id is passed in when loading from localStorage
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;       // "YYYY-MM-DD" string from the date input
        this.isPriority = isPriority;
        this.isCompleted = isCompleted;
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    // Used by the edit form
    update({ title, description, dueDate, isPriority }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isPriority = isPriority;
    }
}