import { motion } from 'framer-motion'
import { Calendar, Users, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="relative h-[600px] md:h-[700px] bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center mix-blend-overlay opacity-50"></div>

      <div className="relative container h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Where Dreams Become Reality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-100"
          >
            Celebrate your special moments at Manomangal Lawns - A premium wedding and event venue in Shirpur
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/booking"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center"
            >
              Book Your Event
            </Link>
            <Link
              to="/gallery"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 text-center"
            >
              View Gallery
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Users size={24} />
              </div>
              <div>
                <div className="font-semibold text-lg">500+ Capacity</div>
                <div className="text-sm text-gray-200">Guest Seating</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Calendar size={24} />
              </div>
              <div>
                <div className="font-semibold text-lg">AC Hall</div>
                <div className="text-sm text-gray-200">Climate Controlled</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Sparkles size={24} />
              </div>
              <div>
                <div className="font-semibold text-lg">Garden Area</div>
                <div className="text-sm text-gray-200">Beautiful Lawns</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
