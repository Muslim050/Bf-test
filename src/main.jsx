import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '@/redux/store.js'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/utils/ThemeContext.jsx'
import { TooltipProvider } from '@/components/ui/tooltip.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <TooltipProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              success: {
                duration: 5000,
              },
            }}
          />
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
)
