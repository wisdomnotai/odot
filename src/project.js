import { Todo } from "./todo.js";
export class Project{
    constructor(title){
        this.id = crypto.randomUUID();
        this.title = title;
        this.todo = [];
    }
    addTodo(todo){
        this.todo.push(todo);
    }
    removeTodo(todoId){
        this.todos.filter(todo => todo.id !== todo.Id);
    }
}