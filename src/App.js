import React, { Component } from 'react';
import './App.css';
import { fetchJson } from './api-helpers.js';
import { Todo } from './Todo.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initializationComplete: false,
      todos: [],
      completedTodos: [],
      newTodoTitle: '',
    };
  }

  componentDidMount() {
    //initialize todo list
    fetchJson('https://jsonplaceholder.typicode.com/todos/1').then((todoRaw)=>{
      const todo = new Todo(todoRaw.title, todoRaw.completed);
      this.setState({
        todos: this.state.todos.concat([todo]),
        initializationComplete: true,
      });
    });
  }

  addTodo(){
    if(this.state.newTodoTitle){
      this.setState({
        todos: this.state.todos.concat([new Todo(this.state.newTodoTitle)]),
        newTodoTitle: '',
      });
    }
  }

  deleteTodo(index, isCompleted=false){
    const key = isCompleted ? 'completedTodos' : 'todos';
    //can't create object literal if key is a variable
    const updateObject = {};
    updateObject[key] = this.state[key].filter((_todo, filterIndex)=>{ return index !== filterIndex; });

    this.setState(updateObject);
  }

  completeTodo(index){
    const completedTodo = this.state.todos[index];

    this.setState({
      completedTodos: this.state.completedTodos.concat([completedTodo]),
    });
    this.deleteTodo(index);
  }

  completedTodos(){
    return (
      <div>
        <h2>Completed</h2>
        <ol className="completed-list">
        {this.state.completedTodos.map((todo, index) => {     
            return (
              <li key={index+1+this.state.todos.length}>
                <span className="todo-text completed-item">{index+1+this.state.todos.length}) {todo.title}</span>
                <span className="list-button-spacer"></span>
                <span className="list-button" onClick={() => {this.deleteTodo(index, true);}}>×</span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  render() {
    const completedTodoMarkup = this.state.completedTodos.length > 0 ? this.completedTodos() : '';


    return (
      <div className="container">
        <header>
          <h1>To-Do List</h1>
        </header>
        <main>
          <div className="add-todo-container">
            <form onSubmit={(e)=>{e.preventDefault();this.addTodo();}}>
              <input type="text" placeholder="Add todo" value={this.state.newTodoTitle} onChange={(e)=>{this.setState({newTodoTitle: e.target.value});}} /> 
              <button className="add-button" onClick={()=>{this.addTodo();}}>Add</button>
            </form>
          </div>
          <div>
            <ol className="completed-list">
              {this.state.todos.map((todo, index) => {     
                  return (
                    <li key={index}>
                      <span className="todo-text">{index+1}) {todo.title}</span>
                      <span className="list-button" onClick={() => {this.completeTodo(index);}}>✓</span>
                      <span className="list-button" onClick={() => {this.deleteTodo(index);}}>×</span>
                    </li>
                  );
                })}
            </ol>
          </div>
          {completedTodoMarkup}
        </main>
      </div>
    );
  }
}

export default App;
