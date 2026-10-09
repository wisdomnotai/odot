import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { TodoManager } from "./manager.js";


const manager = new TodoManager()

const school = manager.createProject("School");
console.log(school);

console.log(manager.projects);
console.log(manager.currentProject.title);
manager.setCurrentProject(manager.projects[0].id);
console.log(manager.currentProject.title);
manager.deleteProject(manager.projects[1].id);
console.log(manager.projects);