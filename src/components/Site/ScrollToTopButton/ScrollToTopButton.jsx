import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ArrowDownToDot } from 'lucide-react'
gsap.registerPlugin(ScrollToPlugin) // Регистрируем плагин
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: 'power2.out' })
  }

  return (
    <div className="relative">
      {isVisible && (
        <button
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            boxShadow:
              'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={scrollToTop}
          className="animate-bounce transition duration-1000	 fixed bottom-10 right-10 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 "
        >
          <ArrowDownToDot className="rotate-180 text-white" />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
