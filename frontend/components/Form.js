import React from 'react'

export default class Form extends React.Component {
  constructor(){
    super();
  }
  render() {
    return (
      <>
      <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
      <input
       value={this.props.todoNameInput} 
       onChange={this.props.onTodoNameInputChange} 
       type="text" placeholder='Type todo'>
       </input>
      <button>Submit</button>
     </form>
     <button
      onClick={this.props.toggleDisplayCompleteds}>
        {this.props.displayCompleteds? 'Hide':'Show'} Completed
        </button>
     </>
    )
  }
}
