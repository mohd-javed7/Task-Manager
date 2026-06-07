import { useNavigate } from 'react-router-dom'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

const Navbar = ({ showHome }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const isLoggedIn = !!token

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    const handleLogoClick = () => {
        if (isLoggedIn) {
            navigate('/dashboard')
        } else {
            navigate('/')
        }
    }

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
                <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                    <ClipboardDocumentListIcon className="w-5 h-5" />
                </div>
                <span className="text-xl font-medium text-indigo-600">Task Manager</span>
            </div>

            <div className="flex gap-4 items-center">
                <button
                    onClick={() => navigate('/about')}
                    className="text-sm px-4 py-2 text-gray-500 hover:text-indigo-600 transition"
                >
                    About
                </button>

                {showHome && (
                    <button
                        onClick={() => isLoggedIn ? navigate('/dashboard') : navigate('/')}
                        className="text-sm px-4 py-2 text-gray-500 hover:text-indigo-600 transition"
                    >
                        Home
                    </button>
                )}

                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="text-sm px-4 py-2 text-gray-400 hover:text-red-500 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="text-sm px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar