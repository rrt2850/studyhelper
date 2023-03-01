import React from 'react'
import "../App.css"
import {SidebarData} from "./SidebarData"

function flip({val}){
    val.checked = !val.checked
}
function Sidebar() {
  return (
    <>
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarData.map((val) => {
                    return(
                        <li className="row" key={val.title} onClick={flip({val})}>
                            <div className="SB-Item-Checkholder">
                                <label >
                                    <input className="SB-Item-Check" type="checkbox" defaultChecked={val.checked} onChange={flip({val})}></input>  
                                </label>
                            </div>
                            
                            <div className="SB-Item-Title">{val.title}</div>
                        </li>
                    )
                })}   
            </ul>
        </div>
    </>
  )
}

export default Sidebar