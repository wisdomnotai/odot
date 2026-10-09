import { Todo } from "./todo.js";
export class Todo{
    constructor(id,title, Todo){
        this.id = crypto.randomUUID;
        this.title = title;
        this.Todo = Todo;
    }
}