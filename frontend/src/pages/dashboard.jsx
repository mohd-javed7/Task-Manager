import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, SparklesIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Dashboard = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [error, setError] = useState('')

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/task`, authHeaders)
      setTasks(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editTask) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/task/${editTask._id}`, formData, authHeaders)
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/task`, formData, authHeaders)
      }
      setFormData({ title: '', description: '' })
      setShowForm(false)
      setEditTask(null)
      fetchTasks()
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/task/${id}`, authHeaders)
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleToggle = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/task/${id}`, {}, authHeaders)
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (task) => {
    setEditTask(task)
    setFormData({ title: task.title, description: task.description })
    setShowForm(true)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending'
    if (filter === 'completed') return task.status === 'completed'
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Navbar isLoggedIn={true} />

      <div className="max-w-5xl w-full mx-auto px-6 py-8 flex-1">

        {/* Greeting */}
        <div className="mb-8 flex items-center gap-2">
          <div>
            <h2 className="text-2xl font-medium text-gray-800 flex items-center gap-2">
              Welcome back, {user?.name}
              <SparklesIcon className="w-6 h-6 text-indigo-400" />
            </h2>
            <p className="text-sm text-gray-400 mt-1">Here's what you have to do today.</p>
          </div>
        </div>

        {/* Task Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          {/* Top bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <button
              onClick={() => { setShowForm(!showForm); setEditTask(null); setFormData({ title: '', description: '' }) }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
            >
              <PlusIcon className="w-4 h-4" />
              Add Task
            </button>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {['all', 'pending', 'completed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-lg capitalize transition ${
                      filter === f
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-400 whitespace-nowrap">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-col gap-3">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <input
                type="text"
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-400 transition"
              />
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-400 transition resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                >
                  {editTask ? 'Update Task' : 'Create Task'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditTask(null) }}
                  className="border border-gray-200 px-5 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Task List */}
          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ClipboardDocumentListIcon className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No tasks yet</p>
              <p className="text-gray-400 text-sm mt-1">Click "Add Task" to create your first one</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTasks.map(task => (
                <div key={task._id} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition">
                  <button
                    onClick={() => handleToggle(task._id)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                      task.status === 'completed'
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'border-gray-300 hover:border-indigo-400'
                    }`}
                  >
                    {task.status === 'completed' && <CheckIcon className="w-3 h-3 text-white" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                    )}
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${
                    task.status === 'completed'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {task.status}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleEdit(task)} className="text-gray-400 hover:text-indigo-500 transition">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="text-gray-400 hover:text-red-500 transition">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
        <Footer />
    </div>
  )
}

export default Dashboard