export class Todo{
    constructor(id, title, description, dueDate, isPriority = false, isCompleted){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isPriority = false;
        this.isCompleted = false;
    }
        toggleCompleted(){
            this.isCompleted = !this.isCompleted;
        }
    }
