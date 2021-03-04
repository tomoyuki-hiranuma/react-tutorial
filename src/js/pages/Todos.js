import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";

export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      newText: "",
      deleteId: "",
    };
  }

  componentDidMount() {
    TodoStore.on("change", this.getTodos);
    console.log("count", TodoStore.listenerCount("change"));
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  createTodo() {
    const text = this.state.newText;
    if(text !== "") {
      TodoActions.createTodo(text);
    }

    this.setState({
      newText: "",
    });
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll()
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  deleteTodo() {
    const id = this.state.deleteId;
    TodoActions.deleteTodo(id);
    this.setState({
      deleteId: "",
      todos: TodoStore.getAll()
    });
  }

  inputText(e) {
    this.setState({
      newText: e.target.value
    });
  }

  inputId(e) {
    this.setState({
      deleteId: e.target.value
    });
  }

  render(){
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
      return <Todo key={todo.id} {...todo} />;
    });

    return (
      <div>
        <button onClick={this.reloadTodos.bind(this)}>reload</button><br />
        <input type="text" value={this.state.newText} onChange={this.inputText.bind(this)}></input><br />
        <button onClick={this.createTodo.bind(this)}>create</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
        <input type="text" value={this.state.deleteId} onChange={this.inputId.bind(this)}></input>
        <button onClick={this.deleteTodo.bind(this)}>delete</button>
      </div>
    )
  }
}