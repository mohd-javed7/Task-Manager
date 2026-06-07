import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showHome={true} />
      <div className="max-w-2xl mx-auto px-6 py-16 flex-1">
        <h2 className="text-3xl font-medium text-gray-800 mb-3">About</h2>
        <p className="text-gray-400 text-sm mb-10">A simple full-stack task management app.</p>
        <div className="flex flex-col gap-6 text-gray-600 text-sm leading-relaxed">
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">The Project</h3>
            <p>Task Manager is a MERN stack web application built as part of an internship assignment. It allows users to register, log in, and manage their personal tasks with full CRUD functionality.</p>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">Tech Stack</h3>
            <p>MongoDB, Express.js, React.js, Node.js with JWT authentication, bcrypt password hashing, and a clean responsive UI built with Tailwind CSS.</p>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">The Developer</h3>
            <p>Built by <span className="text-indigo-600 font-medium">Javed</span> a full-stack developer with a passion for building clean and functional web applications.</p>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-1">Contact</h3>
            <p>Reach out via <a href="mailto:tonyjaved123@gmail.com" className="text-indigo-600 hover:underline">tonyjaved123@gmail.com</a> or find me on <a href="https://github.com/mohd-javed7" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">GitHub</a>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About