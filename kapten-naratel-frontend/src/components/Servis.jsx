import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const Servis = () => {
  const [services, setServices] = useState([])
  const phone = '6288212022222'

  const makeWhatsAppLink = (pkg) => {
    const message = `Halo, saya tertarik dengan paket ${pkg.kecepatan} seharga ${pkg.harga}.`
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/services`
        )
        setServices(response.data)
      } catch (error) {
        console.error('Gagal mengambil data layanan:', error)
      }
    }

    fetchServices()
  }, [])

  return (
    <motion.section
      id="servis"
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Paket Layanan Kami
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {services.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="bg-white rounded-2xl p-6 text-center shadow-md border hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-500 text-lg font-semibold mb-2">
              {pkg.kecepatan}
            </p>
            <h3 className="text-3xl font-bold text-black mb-2">
              {pkg.harga}
            </h3>
            <p className="text-gray-600 mb-4">
              Biaya Instalasi: {pkg.harga_instalasi}
            </p>
            <p className="text-gray-700 mb-6">
              {pkg.description}
            </p>
            <motion.a
              href={makeWhatsAppLink(pkg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-700 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-full text-sm transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              WhatsApp
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Servis
