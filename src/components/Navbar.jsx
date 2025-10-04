import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut, isOwner } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Booking', path: '/booking' },
    { name: 'Menus', path: '/menus' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-display font-bold text-primary-600">
              Manomangal Lawns
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                {isOwner && (
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={20} />
                  <span className="font-medium">{profile?.full_name}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  {isOwner && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="py-2 text-gray-700 font-medium">
                    {profile?.full_name}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsOpen(false)
                    }}
                    className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-primary-600 font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
