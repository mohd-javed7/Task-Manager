import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="w-full border-t border-gray-200 py-6 px-8 mt-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-400 w-full">
        <p>© 2026 Task Manager. Built by <span className="text-indigo-600 font-medium">Javed</span></p>
        <div className="flex gap-6">
          <button onClick={() => navigate('/about')} className="hover:text-indigo-600 transition">About</button>
          <a href="mailto:tonyjaved123@gmail.com" className="hover:text-indigo-600 transition">Contact</a>
          <a href="https://github.com/mohd-javed7" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer