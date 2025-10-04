import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: inquiryError } = await supabase
        .from('contact_inquiries')
        .insert([formData])

      if (inquiryError) throw inquiryError

      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })

      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
      setError(err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/919359525834', '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:+919359525834'
  }

  const handleEmail = () => {
    window.location.href = 'mailto:jayeshrcpit2003@gmail.com'
  }

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
            Contact Us
          </motion.h1>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our venue or want to schedule a visit? We'd love to hear from you!
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <MapPin className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Manomangal Lawns<br />
                      Shingave Shivar, Shirpur<br />
                      Maharashtra 425405
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+91 9359525834</p>
                    <p className="text-sm text-gray-500">Available 9:00 AM - 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">jayeshrcpit2003@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Contact</h3>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center space-x-3 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Us</span>
                </button>

                <button
                  onClick={handleCall}
                  className="flex items-center space-x-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Phone size={20} />
                  <span>Call Now</span>
                </button>

                <button
                  onClick={handleEmail}
                  className="flex items-center space-x-3 w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Mail size={20} />
                  <span>Send Email</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    rows="5"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-lg h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d74.8!3d21.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE4JzAwLjAiTiA3NMKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
