import React, {useState, useRef} from 'react'
//useRef allows us to access elements inside the html from outside?

import {v4 as uuid} from 'uuid'
import TodoList from "./TodoList";

function App() {
  //usestate takes one argument which is returned as todos, setTodos is a function usestate creates to update the todolist state
  // Todo objects are stored as json objects
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    
    // basically means prevTodos = [prevTodos, new object] and calls setTodos to update them
    setTodos(prevTodos => {
      // ... populates new array with elements of previous array and then tagging the json object to end adds it to array
      return [...prevTodos, {id: uuid(), name: name, complete:false}]
    })

    todoNameRef.current = ''
  }

  return (
    <>
    <TodoList todos={todos}/>

    {/** adding ref={} allows us to reference the contents of the text box from anywhere */}
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button>Clear Completed</button>
    <div>0 left to do</div>
    </>
  );
}

export default App;
