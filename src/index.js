class Todo{
    constructor(id, title, description, dueDate, isPriority, isCompleted){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isPriority = isPriority;
        this.isCompleted = isCompleted;
    }
}

