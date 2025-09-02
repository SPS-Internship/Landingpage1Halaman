// src/components/Testimonial.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

// Variants animasi transisi testimonial
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

const Testimonial = () => {
  const [[currentIndex, direction], setIndex] = useState([0, 1])
  const [testimonials, setTestimonials] = useState([])

  // Ambil data testimonial dari backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVICE_CONTEND_URL}/api/testimonials`
        )
        setTestimonials(response.data)
      } catch (error) {
        console.error('Gagal memuat testimonials:', error)
      }
    }

    fetchTestimonials()
  }, [])

  // Auto-ganti testimonial setiap 4 detik
  useEffect(() => {
    if (testimonials.length === 0) return

    const interval = setInterval(() => {
      setIndex(([prev]) => [(prev + 1) % testimonials.length, 1])
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials])

  const paginate = (newIndex) => {
    const dir = newIndex > currentIndex ? 1 : -1
    setIndex([newIndex, dir])
  }

  if (testimonials.length === 0) return null

  return (
    <section
      id="testimonial"
      className="py-20 px-4 bg-gradient-to-b from-orange-100 to-white  overflow-hidden"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Apa Kata Mereka?
      </motion.h2>

      <div className="relative max-w-3xl mx-auto min-h-[260px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            className="relative bg-white p-8 rounded-2xl shadow-md border border-blue-100"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="text-yellow-400 text-5xl absolute top-4 right-4">”</div>

            <p className="text-gray-800 italic text-lg mb-6 leading-relaxed">
              "{testimonials[currentIndex]?.message || testimonials[currentIndex]?.comment}"
            </p>
            <p className="text-orange-500 font-bold text-right">
              – {testimonials[currentIndex]?.name}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i)}
              aria-label={`Lihat testimoni ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i === currentIndex ? 'bg-orange-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
