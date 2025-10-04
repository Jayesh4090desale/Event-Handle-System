import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const About = () => {
  const amenities = [
    'Spacious lawn area with beautiful landscaping',
    'Fully air-conditioned banquet hall',
    'Modern kitchen facilities for catering',
    'Professional sound and lighting systems',
    'Dedicated parking space for 100+ vehicles',
    'Elegant stage and decor setup',
    'Separate rooms for guests',
    'Professional event management support',
    'High-speed Wi-Fi connectivity',
    'Power backup for uninterrupted events',
  ]

  return (
    <div>
      <div className="relative h-64 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container h-full flex items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-display font-bold text-white"
          >
            About Manomangal Lawns
          </motion.h1>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-display font-bold mb-6 text-gray-900">
                Your Perfect Event Destination
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to Manomangal Lawns, Shirpur's premier wedding and event venue.
                Located in the serene area of Shingave Shivar, our venue combines elegant
                architecture with natural beauty to create the perfect backdrop for your
                special occasions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With over a decade of experience in hosting memorable events, we pride
                ourselves on providing exceptional service, state-of-the-art facilities,
                and personalized attention to every detail. Whether it's an intimate
                gathering or a grand celebration, we have the perfect space for you.
              </p>
              <p className="text-lg text-gray-600">
                Our dedicated team, led by Jayesh Patil, works tirelessly to ensure that
                every event at Manomangal Lawns exceeds expectations and creates lasting
                memories for you and your guests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Venue"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Amenities
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need under one roof
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={24} />
                <span className="text-lg text-gray-700">{amenity}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Event Capacity
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-8 text-center"
            >
              <div className="text-5xl font-bold text-primary-600 mb-4">500+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                Seated Guests
              </div>
              <p className="text-gray-600">Comfortable seating arrangement</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card p-8 text-center"
            >
              <div className="text-5xl font-bold text-primary-600 mb-4">800+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                Standing Capacity
              </div>
              <p className="text-gray-600">For cocktail-style events</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8 text-center"
            >
              <div className="text-5xl font-bold text-primary-600 mb-4">100+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                Parking Spaces
              </div>
              <p className="text-gray-600">Convenient vehicle parking</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
