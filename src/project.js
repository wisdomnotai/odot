export class Project {
    constructor(title, id = crypto.randomUUID()) {
        this.id = id;                 // id is passed in when loading from localStorage
        this.title = title;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodo(todoId) {
        return this.todos.find(todo => todo.id === todoId);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }
}