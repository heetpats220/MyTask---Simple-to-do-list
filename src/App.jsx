import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [task, settask] = useState("")
  const [todos, settodos] = useState([])
  const [edited, setedited] = useState("")

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])

  const handleAdd = () => {
    if (task.trim() === "") {
      alert("Please enter a task")
      return
    }
    if (edited) {
      const updatetodos = todos.map((t) => t.id === edited ? { ...t, task } : t);
      settodos(updatetodos)
      setedited("")
    }
    else{
    settodos([...todos, { id: uuidv4(), task, isCompleted: false }])
    }
    settask("")
  }

  const handleEdit = (id) => {
    const toEdit = todos.find((i) => i.id === id)
    settask(toEdit.task)
    setedited(id)
  }

  const handleDel = (id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newtodos)
  }

  const handleChange = (e) => {
    settask(e.target.value);
  }

  const handleChk = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    
  }



  return (
    <>
      <div className="container">
        <div className="top">
          <h1>MyTask</h1>
          <p>Your simple to-do list</p>
        </div>
        <div className="taskbar">
          Add your new tasks here
          <input onChange={handleChange} value={task} type="text" placeholder="What's your next to-do?" />
          <button onClick={handleAdd}>{edited ? "Save": "+ Add Task"}</button>
        </div>
        <div className="mytask">
          <nav>
            Your Tasks
            <ul>
              {todos.length === 0 && <div className="null">You're all good!</div>}
              {todos.map(item => {
                return <li><input name={item.id} onChange={handleChk} type="checkbox" checked={item.isCompleted} /><div key={item.id} className={item.isCompleted ? "task" : "done"}>{item.task}</div>
                  <button onClick={() => { handleEdit(item.id) }} className="ed">Edit</button>
                  <button onClick={() => { handleDel(item.id) }} className="del">Delete</button></li>
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default App
