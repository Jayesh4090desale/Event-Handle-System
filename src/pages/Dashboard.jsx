import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Users, DollarSign, Mail, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { format } from 'date-fns'

const Dashboard = () => {
  const { isOwner, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isOwner) {
      navigate('/')
    }
  }, [isOwner, authLoading, navigate])

  useEffect(() => {
    if (isOwner) {
      loadDashboardData()
    }
  }, [isOwner])

  const loadDashboardData = async () => {
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (bookingsError) throw bookingsError

      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('contact_inquiries')
        .select('*')
        .eq('status', 'new')
        .order('created_at', { ascending: false })

      if (inquiriesError) throw inquiriesError

      setBookings(bookingsData || [])
      setInquiries(inquiriesData || [])

      const totalBookings = bookingsData?.length || 0
      const pendingBookings = bookingsData?.filter(b => b.status === 'pending').length || 0
      const confirmedBookings = bookingsData?.filter(b => b.status === 'confirmed').length || 0
      const totalRevenue = bookingsData
        ?.filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + parseFloat(b.estimated_price || 0), 0) || 0

      setStats({
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalRevenue,
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)

      if (error) throw error
      await loadDashboardData()
    } catch (error) {
      console.error('Error updating booking:', error)
    }
  }

  const updateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId)

      if (error) throw error
      await loadDashboardData()
    } catch (error) {
      console.error('Error updating inquiry:', error)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
    }

    const badge = badges[status] || badges.pending
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <Icon size={14} />
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    )
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!isOwner) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
            Owner Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats.totalBookings}
              </div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="text-yellow-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats.pendingBookings}
              </div>
              <div className="text-sm text-gray-600">Pending Bookings</div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats.confirmedBookings}
              </div>
              <div className="text-sm text-gray-600">Confirmed Bookings</div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <DollarSign className="text-primary-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ₹{stats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Recent Bookings
              </h2>

              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="card p-8 text-center text-gray-600">
                    No bookings yet
                  </div>
                ) : (
                  bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="card p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {booking.customer_name}
                          </h3>
                          <p className="text-sm text-gray-600">{booking.event_type}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-gray-600">Date</div>
                          <div className="font-medium text-gray-900">
                            {format(new Date(booking.event_date), 'MMM dd, yyyy')}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Guests</div>
                          <div className="font-medium text-gray-900">{booking.guest_count}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Phone</div>
                          <div className="font-medium text-gray-900">{booking.customer_phone}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Price</div>
                          <div className="font-medium text-gray-900">
                            ₹{parseFloat(booking.estimated_price).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {booking.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                New Inquiries
              </h2>

              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <div className="card p-8 text-center text-gray-600">
                    No new inquiries
                  </div>
                ) : (
                  inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="card p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                          <p className="text-sm text-gray-600">{inquiry.email}</p>
                          <p className="text-sm text-gray-600">{inquiry.phone}</p>
                        </div>
                        <Mail className="text-primary-600" size={24} />
                      </div>

                      <p className="text-gray-700 mb-4">{inquiry.message}</p>

                      <div className="text-xs text-gray-500 mb-3">
                        {format(new Date(inquiry.created_at), 'MMM dd, yyyy hh:mm a')}
                      </div>

                      <button
                        onClick={() => updateInquiryStatus(inquiry.id, 'contacted')}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Mark as Contacted
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
