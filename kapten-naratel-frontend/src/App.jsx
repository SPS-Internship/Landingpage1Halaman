// src/App.jsx
import Header from './components/header'
import Benefit from './components/Benefit'
import PilarSection from './components/PilarSection'
import PromoSection from './components/PromoSection'
import Servis from './components/Servis'
import Testimonial from './components/Testimonial'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Benefit />
      <Servis />

      <PilarSection />
      {/* <PromoSection /> */}
      <Testimonial />
      <Footer />
    </div>
  )
}

export default App
