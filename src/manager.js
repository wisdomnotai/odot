import { Project } from "./project.js";
import { Todo } from "./todo.js";

export class TodoManager {
    constructor(){
        this.project = [];
        const defaultProject = new Project("myTasks");
        this.project.push(defaultProject);
        this.currentProject = defaultProject;
    }
    
}


