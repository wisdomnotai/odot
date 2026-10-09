import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { TodoManager } from "./manager.js";

const manager = new TodoManager();
console.log(manager);
console.log(manager.project);
console.log(manager.currentProject);