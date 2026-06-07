import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 flex-col justify-center px-12 text-white">
        <h1 className="text-4xl font-medium mb-3">Task Manager</h1>
        <p className="text-indigo-200 text-lg mb-10">Organize your day, one task at a time.</p>
        <ul className="flex flex-col gap-4">
          {[
            'Create and manage tasks easily',
            'Track pending and completed work',
            'Secure login with JWT auth',
            'Simple, clean, and fast',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-indigo-100">
              <CheckCircleIcon className="w-5 h-5 text-indigo-300 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md">

          <h2 className="text-2xl font-medium text-gray-800 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-400 mb-6">Log in to your Task Manager account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login