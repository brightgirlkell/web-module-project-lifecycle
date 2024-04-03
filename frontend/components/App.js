import React from 'react'
import axios from 'axios';
import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super();
    this.state ={
       todos:[],
       error:'',
       todoNameInput: '',
       displayCompleteds: true,
      }
  }
  onTodoNameInputChange = evt =>{
    const {value}= evt.target
    this.setState({...this.state, todoNameInput: value})
  }
  resetForm = ()=>this.setState({...this.state, todoNameInput:''})

  setAxiosReposeError = ()=> this.setState({...this.state, error: err.response.data.message})

  postNewTodo =()=>{
    axios.post(URL, {name: this.state.todoNameInput})
    .then (res =>{
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(err =>{
      this.setAxiosReposeError()
    })
  }

  fetchALLTodos = () =>{
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosReposeError)
  }

  onTodoFormSubmit = evt =>{
    evt.preventDefault()
    this.postNewTodo()
  }
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res =>{
      this.setState({...this.state, todos: this.state.todos.map(td=>{
        if (td.id !== id) return td
        return res.data.data
      })})
    })
    .catch(this.setAxiosReposeError)
  }
  toggleDisplayCompleteds=()=>{
    this.setState({...this.state, displayCompleteds:!this.state.displayCompleteds})
  }
  componentDidMount(){
    this.fetchALLTodos()//fetch the todos from server
  }
  render() {
    return(
      <div>
        <div id="error">{this.state.error}</div>
    <TodoList
    todos={this.state.todos}
    displayCompleteds={this.state.displayCompleteds}
    toggleCompleted={this.toggleCompleted}
    />
     <Form
     onTodoFormSubmit= {this.onTodoFormSubmit}
     todoNameInput= {this.state.todoNameInput}
     onTodoNameInputChange={this.onTodoNameInputChange}
     toggleDisplayCompleteds={this.toggleDisplayCompleteds}
     displayCompleteds={this.state.displayCompleteds}
     />
     </div>
    )
  }
}
