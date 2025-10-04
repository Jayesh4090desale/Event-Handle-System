import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, Clock, Users, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const Booking = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)
  const [formData, setFormData] = useState({
    eventType: '',
    timeSlot: '',
    guestCount: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequirements: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const eventTypes = [
    'Wedding Ceremony',
    'Reception Party',
    'Birthday Celebration',
    'Corporate Event',
    'Anniversary',
    'Other',
  ]

  const timeSlots = [
    { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)', price: 25000 },
    { value: 'evening', label: 'Evening (4:00 PM - 10:00 PM)', price: 35000 },
    { value: 'fullday', label: 'Full Day (8:00 AM - 10:00 PM)', price: 50000 },
  ]

  const calculatePrice = () => {
    const slot = timeSlots.find(s => s.value === formData.timeSlot)
    if (!slot) return 0

    let basePrice = slot.price
    const guestCount = parseInt(formData.guestCount) || 0

    if (guestCount > 300) {
      basePrice += (guestCount - 300) * 50
    }

    return basePrice
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    if (!selectedDate) {
      setError('Please select an event date')
      return
    }

    setError('')
    setLoading(true)

    try {
      const estimatedPrice = calculatePrice()

      const { data, error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            event_type: formData.eventType,
            event_date: selectedDate.toISOString().split('T')[0],
            time_slot: formData.timeSlot,
            guest_count: parseInt(formData.guestCount),
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            special_requirements: formData.specialRequirements,
            estimated_price: estimatedPrice,
            status: 'pending',
          },
        ])
        .select()

      if (bookingError) throw bookingError

      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  const estimatedPrice = calculatePrice()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Book Your Event
            </h1>
            <p className="text-xl text-gray-600">
              Fill in the details to secure your date at Manomangal Lawns
            </p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-8">
              Booking submitted successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          <div className="card p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={18} />
                    <span>Event Date</span>
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select a date"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="timeSlot" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock size={18} />
                    <span>Time Slot</span>
                  </label>
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label} - ₹{slot.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="guestCount" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Users size={18} />
                    <span>Expected Guests</span>
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Number of guests"
                    min="1"
                    max="800"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements (Optional)
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Any special requests or requirements..."
                ></textarea>
              </div>

              {estimatedPrice > 0 && (
                <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign size={24} className="text-primary-600" />
                      <span className="text-lg font-semibold text-gray-900">
                        Estimated Price:
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-primary-600">
                      ₹{estimatedPrice.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    * Final price may vary based on additional services and customization
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting Booking...' : 'Submit Booking Request'}
              </button>

              <p className="text-center text-sm text-gray-600">
                Our team will contact you within 24 hours to confirm your booking
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Booking
