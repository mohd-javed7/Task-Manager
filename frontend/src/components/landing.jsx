import { useNavigate } from 'react-router-dom'
import { PlusCircleIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center py-16">
        <h1 className="text-5xl font-medium leading-tight mb-4">
          Manage your tasks with{' '}
          <span className="text-indigo-600">Task Manager</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
          A clean and simple way to organise your day. Create tasks, track progress, and get things done.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <button
            onClick={() => navigate('/register')}
            className="bg-indigo-600 text-white px-7 py-2.5 rounded-lg text-base hover:bg-indigo-700 transition"
          >
            Get Started →
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-gray-300 px-7 py-2.5 rounded-lg text-base hover:bg-gray-50 transition"
          >
            Log in
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">
          {[
            { icon: <PlusCircleIcon className="w-8 h-8 text-indigo-600" />, title: 'Create tasks', desc: 'Add tasks with titles and descriptions in seconds.' },
            { icon: <CheckCircleIcon className="w-8 h-8 text-indigo-600" />, title: 'Track status', desc: 'Mark tasks as pending or completed with one click.' },
            { icon: <LockClosedIcon className="w-8 h-8 text-indigo-600" />, title: 'Secure login', desc: 'Your tasks are private, protected with JWT auth.' },
          ].map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-8 text-left">
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-base font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Landing