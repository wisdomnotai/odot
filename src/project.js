import { Todo } from "./todo.js";
export class Project{
    constructor(title){
        this.id = crypto.randomUUID;
        this.title = title;
        this.Todo = [];
    }
    addTodo(todo){
        this.todo.push(todo);
    }
    removeTodo(todoId){
        this.todos.filter(todo => todo.id !== todo.Id);
    }
}