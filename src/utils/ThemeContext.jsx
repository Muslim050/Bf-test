// ThemeContext.jsx
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState(
    Cookies.get('selectedBgColor') || '#172841', // Получаем цвет из cookies
  )
  const [textColor, setTextColor] = useState('#172841')

  // Функция для преобразования HEX в HSL
  const hexToHSL = (hex) => {
    let r = 0,
      g = 0,
      b = 0
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16)
      g = parseInt(hex.slice(3, 5), 16)
      b = parseInt(hex.slice(5, 7), 16)
    }
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h,
      s,
      l = (max + min) / 2
    const d = max - min

    if (d === 0) {
      h = s = 0
    } else {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
        default:
          break
      }
      h /= 6
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  // Функция для затемнения цвета
  const darkenColor = (hslColor, percent) => {
    const darkerL = Math.max(0, hslColor.l - percent)
    return `hsl(${hslColor.h}, ${hslColor.s}%, ${darkerL}%)`
  }

  useEffect(() => {
    const getContrastColor = (hexColor) => {
      const rgb = parseInt(hexColor.slice(1), 16)
      const r = (rgb >> 16) & 0xff
      const g = (rgb >> 8) & 0xff
      const b = rgb & 0xff
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      return brightness > 128 ? '#1d1d1f' : '#ffffff'
    }

    // Преобразуем HEX в HSL и уменьшаем яркость
    const hslColor = hexToHSL(bgColor)
    const darkerBgColor = darkenColor(hslColor, 10) // Уменьшаем яркость на 10%

    // Рассчитываем контрастный цвет для текста
    const contrastTextColor = getContrastColor(bgColor)

    // Устанавливаем текстовый и фоновый цвет
    setTextColor(contrastTextColor)

    // Сохраняем цвет в cookies при каждом обновлении
    Cookies.set('selectedBgColor', bgColor)

    // Применяем цвета в CSS переменные
    document.documentElement.style.setProperty(
      '--text-color',
      contrastTextColor,
    )
    document.documentElement.style.setProperty('--bg-color', darkerBgColor)
  }, [bgColor])

  return (
    <ThemeContext.Provider value={{ bgColor, setBgColor, textColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
