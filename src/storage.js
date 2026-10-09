import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { TodoManager } from "./manager.js";

const KEY = "doable-data";

export function saveManager(manager) {
    try {
        const data = {
            currentProjectId: manager?.currentProject?.id ?? null,
            projects: manager?.projects ?? [],
        };
        localStorage.setItem(KEY, JSON.stringify(data));
    } catch (error) {
        console.warn("Unable to save todo data.", error);
    }
}

export function loadManager() {
    const manager = new TodoManager();
    try {
        if (!globalThis.localStorage) return manager;

        const raw = localStorage.getItem(KEY);
        if (!raw) return manager; // first visit: nothing saved yet

        const data = JSON.parse(raw);
        const projects = (data.projects ?? []).map(p => {
            const project = new Project(p.title, p.id);
            (p.todos ?? []).forEach(t => {
                project.addTodo(new Todo(t.title, t.description, t.dueDate, t.isPriority, t.isCompleted, t.id));
            });
            return project;
        });
        if (!projects.length) return manager;

        manager.projects = projects;
        manager.currentProject = projects.find(p => p.id === data.currentProjectId) || projects[0];
        return manager;
    } catch (error) {
        console.warn("Saved data was unreadable, starting fresh.", error);
        if (globalThis.localStorage) localStorage.removeItem(KEY);
        return new TodoManager();
    }
}