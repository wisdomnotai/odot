import { Todo } from "./todo.js";

export class Project {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }
}