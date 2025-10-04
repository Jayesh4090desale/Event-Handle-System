import { motion } from 'framer-motion'
import { Users, Car, Wind, Utensils, Music, Camera } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Large Capacity',
      description: 'Accommodate up to 500+ guests comfortably',
    },
    {
      icon: Car,
      title: 'Ample Parking',
      description: 'Spacious parking area for your guests',
    },
    {
      icon: Wind,
      title: 'AC Hall',
      description: 'Climate-controlled indoor venue',
    },
    {
      icon: Utensils,
      title: 'Catering Services',
      description: 'Delicious multi-cuisine menu options',
    },
    {
      icon: Music,
      title: 'Sound System',
      description: 'Professional audio equipment included',
    },
    {
      icon: Camera,
      title: 'Beautiful Ambiance',
      description: 'Stunning garden and elegant interiors',
    },
  ]

  const testimonials = [
    {
      name: 'Priya & Rahul',
      event: 'Wedding Reception',
      text: 'Manomangal Lawns made our wedding reception absolutely perfect. The venue was beautiful, the staff was professional, and all our guests were impressed!',
      rating: 5,
    },
    {
      name: 'Amit Sharma',
      event: 'Corporate Event',
      text: 'We hosted our annual company event here and it was a huge success. The facilities are top-notch and the management team was very accommodating.',
      rating: 5,
    },
    {
      name: 'Sneha Patel',
      event: 'Birthday Celebration',
      text: 'Amazing experience! The garden area is perfect for outdoor celebrations. Highly recommend for any special occasion.',
      rating: 5,
    },
  ]

  return (
    <div>
      <HeroSection />

      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Our Premium Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make your event memorable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from those who celebrated with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.event}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-600 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Book Your Event?
            </h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Don't wait! Secure your date today and let us help you create unforgettable memories
            </p>
            <Link
              to="/booking"
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-12 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
