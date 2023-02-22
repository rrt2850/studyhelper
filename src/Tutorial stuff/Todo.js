import React from 'react'



export default function Todo({todo}) {
  return (
    <div>
        <label>
            <input type="checkbox" defaultChecked={todo.complete} onChange={todo.complete = !todo.complete}></input>  
        </label>
        {todo.name}, id: {todo.id}, checked: {todo.complete.toString()}
    </div>
  )
}
