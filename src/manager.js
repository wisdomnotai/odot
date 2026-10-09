import { Project } from "./project.js";
import { Todo } from "./todo.js";

export class TodoManager {
    constructor() {
        this.projects = [];
        const defaultProject = new Project("myTasks");
        this.projects.push(defaultProject);
        this.currentProject = defaultProject;
    }

    createProject(title) {
        const project = new Project(title);
        this.projects.push(project);
        this.currentProject = project;
        return project;
    }

    setCurrentProject(projectID) {
        const project = this.projects.find(project => project.id === projectID);
        if (!project) {
            return;
        }
        this.currentProject = project;
    }

    deleteProject(projectID) {
        const defaultProject = this.projects[0];
        if (projectID === defaultProject.id) {
            return;
        }
        this.projects = this.projects.filter(project => project.id !== projectID);
        if (this.currentProject.id === projectID) {
            this.currentProject = defaultProject;
        }
    }
}