class Todo {
  constructor(parameters) {
    this.id = parameters.id;
    this.title = parameters.title;
    this.description = parameters.description;
    this.date = parameters.date;
    this.time = parameters.time;
    this.tags = parameters.tags || [];
    this.category = parameters.category;
    this.completed = parameters.completed || false;
  }
}

export default Todo;
