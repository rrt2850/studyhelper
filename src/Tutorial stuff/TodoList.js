import React from 'react'
import Todo from './Todo'

export default function TodoList({todos}) {
  return (
    <>
    {/** enter everything inside <></> so it returns as one argument instead of multiple returns.
         it's like returning a tuple so you can return multiple variables from one function */}
        <div>
            {/* curly brackets show that you're using javascript to compiler*/}
            TodoList Length: {todos.length}
        </div>
        <div>
            {todos.map(todo => {
                // using key here means it only updates one element instead of all elements
                return <Todo key={todo.id} todo={todo}/>
            })}
        </div>
    </>
    
  )
}
