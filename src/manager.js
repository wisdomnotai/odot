// Holds every project and knows which one is selected. No DOM code in here.
import { Project } from "./project.js";

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
            return null;
        }
        this.currentProject = project;
        return project;
    }

    deleteProject(projectID) {
        const defaultProject = this.projects[0];
        if (projectID === defaultProject.id) {
            return; // the default project can't be deleted
        }
        this.projects = this.projects.filter(project => project.id !== projectID);
        if (this.currentProject.id === projectID) {
            this.currentProject = defaultProject;
        }
    }
}