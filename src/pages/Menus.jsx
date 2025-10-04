import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf, DollarSign } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Menus = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Starter', 'Main Course', 'Dessert', 'Beverages']

  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })

      if (error) throw error
      setMenuItems(data || [])
    } catch (error) {
      console.error('Error loading menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  const sampleMenus = [
    { id: 1, name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', category: 'Starter', price: 250, isVeg: true },
    { id: 2, name: 'Chicken Tikka', description: 'Marinated grilled chicken', category: 'Starter', price: 280, isVeg: false },
    { id: 3, name: 'Veg Manchurian', description: 'Indo-Chinese vegetable balls', category: 'Starter', price: 220, isVeg: true },
    { id: 4, name: 'Dal Makhani', description: 'Creamy black lentils', category: 'Main Course', price: 200, isVeg: true },
    { id: 5, name: 'Butter Chicken', description: 'Tender chicken in rich tomato gravy', category: 'Main Course', price: 350, isVeg: false },
    { id: 6, name: 'Paneer Butter Masala', description: 'Cottage cheese in creamy gravy', category: 'Main Course', price: 280, isVeg: true },
    { id: 7, name: 'Biryani', description: 'Fragrant rice with spices', category: 'Main Course', price: 300, isVeg: true },
    { id: 8, name: 'Naan', description: 'Traditional Indian bread', category: 'Main Course', price: 50, isVeg: true },
    { id: 9, name: 'Gulab Jamun', description: 'Sweet fried dumplings in syrup', category: 'Dessert', price: 100, isVeg: true },
    { id: 10, name: 'Ice Cream', description: 'Assorted flavors', category: 'Dessert', price: 80, isVeg: true },
    { id: 11, name: 'Soft Drinks', description: 'Chilled beverages', category: 'Beverages', price: 50, isVeg: true },
    { id: 12, name: 'Fresh Juice', description: 'Seasonal fruit juice', category: 'Beverages', price: 80, isVeg: true },
  ]

  const displayItems = menuItems.length > 0 ? filteredItems :
    (selectedCategory === 'All' ? sampleMenus : sampleMenus.filter(item => item.category === selectedCategory))

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
            Our Menus
          </motion.h1>
        </div>
      </div>

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
              Delicious Catering Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our wide variety of cuisines to make your event memorable
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading menu items...</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="card p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    {(item.is_vegetarian || item.isVeg) && (
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Leaf size={18} className="text-green-600" />
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-1 text-primary-600 font-bold text-lg">
                      <span>₹{(item.price_per_plate || item.price).toFixed(2)}</span>
                      <span className="text-sm text-gray-500 font-normal">/plate</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {displayItems.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No menu items available in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Custom Menu Packages
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We offer customized menu packages based on your preferences and budget.
              Contact us to discuss your specific requirements and create a personalized
              dining experience for your guests.
            </p>
            <a
              href="/contact"
              className="inline-block btn-primary"
            >
              Contact Us for Custom Menu
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Menus
