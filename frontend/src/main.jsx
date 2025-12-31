import { AuthInitializer } from '@/init/AuthInitializer'
import { ThemeInitializer } from '@/init/ThemeInitializer'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <ThemeInitializer>
    <AuthInitializer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthInitializer>
  </ThemeInitializer>,
)
