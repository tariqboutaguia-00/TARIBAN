import { Routes, Route } from 'react-router-dom'
import './App.css'
import KanbanBoard from './pages/KanbanBoard'
import TaskDetail from './pages/TaskDetail'
import NewTask from './pages/NewTask'
import EditTask from './pages/EditTask'

function App() {
  return (
    <div className="app" style={{ width: '100%', minHeight: '100vh', padding: '2rem' }}>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/new" element={<NewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </div>
  )
}

export default App
