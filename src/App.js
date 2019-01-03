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

  render() {
    return (
      <div className="container">
        <header>
          <h1>To-Do List</h1>
        </header>
        <main>
          <div>
            <input type="text" placeholder="Add todo" value={this.state.newTodoTitle} onChange={(e)=>{this.setState({newTodoTitle: e.target.value});}} /> 
            <button className="add-button" onClick={()=>{this.addTodo();}}>Add</button>
          </div>
          <div>
            <ol className="completed-list">
              {this.state.todos.map((todo, index) => {     
                  return (
                    <li key={index}>
                      {index}) {todo.title}
                    </li>
                  );
                })}
            </ol>
          </div>
          <div>
            <h2>Completed</h2>
            <ol className="completed-list">
            {this.state.completedTodos.map((todo, index) => {     
                return (
                  <li key={index}>
                    {index}) {todo.title}
                  </li>
                );
              })}
            </ol>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
