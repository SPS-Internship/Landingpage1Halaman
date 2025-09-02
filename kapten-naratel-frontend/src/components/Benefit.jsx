import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'

// Fallback jika API tidak tersedia
const defaultBenefits = [
  {
    title: 'Kecepatan Nyata, Bukan Sekadar "Up To"',
    description: 'Nikmati kecepatan internet sesuai paket tanpa tipu-tipu.',
  },
  {
    title: 'Unlimited Tanpa FUP',
    description: 'Akses internet sepuasnya tanpa batasan pemakaian wajar.',
  },
  {
    title: 'Biaya Tetap Setiap Bulan',
    description: 'Tanpa biaya tambahan atau biaya tersembunyi.',
  },
  {
    title: 'Garansi 624',
    description:
      'Jika terjadi gangguan selama 6 jam, Anda mendapat kompensasi 24 jam masa aktif gratis.',
  },
]

// Animasi perpindahan card
const variants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    scale: 0.95,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    scale: 0.95,
    transition: { duration: 0.5 },
  }),
}

// Animasi teks fade in dari bawah
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const Benefit = () => {
  const [[index, direction], setIndex] = useState([0, 1])
  const [benefits, setBenefits] = useState([])

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/benefits`
        )
        const data = response.data.length > 0 ? response.data : defaultBenefits
        setBenefits(data)
      } catch (error) {
        console.error('Gagal memuat benefits:', error)
        setBenefits(defaultBenefits)
      }
    }

    fetchBenefits()
  }, [])

  useEffect(() => {
    if (benefits.length === 0) return
    const interval = setInterval(() => {
      setIndex(([prev]) => [(prev + 1) % benefits.length, 1])
    }, 4000)
    return () => clearInterval(interval)
  }, [benefits])

  const paginate = (newIndex) => {
    const dir = newIndex > index ? 1 : -1
    setIndex([newIndex, dir])
  }

  if (benefits.length === 0) return null

  return (
    <motion.section
      id="keuntungan"
      className="py-20 bg-orange-50 overflow-hidden"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <div className="mt-16 flex flex-col md:flex-row-reverse items-center justify-center gap-12 px-6 md:px-12">
        {/* Gambar Kapten */}
        <img
          src="/Kapten2.png"
          alt="Kapten Naratel"
          className="w-64 md:w-80 object-contain"
        />

        {/* Text & Card */}
        <div className="relative max-w-2xl w-full text-left">
          {/* Judul */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-orange-600 mb-10 text-left"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Kenapa Pilih Kapten Naratel?
          </motion.h2>

          {/* Kartu Benefit */}
          <div className="relative min-h-[160px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-500 flex items-center gap-4 absolute w-full"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <FaCheckCircle className="text-orange-500 text-3xl shrink-0" />
                <div className="space-y-1 text-left">
                  <p className="text-lg font-semibold text-gray-800">
                    {benefits[index]?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {benefits[index]?.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bullet Navigasi */}
          <div className="mt-6 flex justify-center md:justify-start md:ml-75 space-x-2">
            {benefits.map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === index ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Benefit
