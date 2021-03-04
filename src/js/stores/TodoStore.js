import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
// データの管理を行うクラス
class TodoStore extends EventEmitter {
  constructor(){
    super();
    this.todos = [
        {
          id: 113464613,
          text: "Go shopping to Machida",
          complete: false,
        },
        {
          id: 235684679,
          text: "Pay bills",
          complete: false,
        },
    ]
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text,
      complete: false
    });

    this.emit("change");
  }

  receiveTodos(todos) {
    this.todos = todos;
    this.emit("change");
  }

  deleteTodo(id){
    let todos = this.todos.filter(todo => todo.id != id);
    this.todos = todos;
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type){
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        this.receiveTodos(action.todos);
        break;
      }
      case "DELETE_TODO": {
        this.deleteTodo(action.id);
        break;
      }
    }
  }
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;