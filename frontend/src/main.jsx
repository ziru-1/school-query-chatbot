import { AuthInitializer } from '@/init/AuthInitializer'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <AuthInitializer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthInitializer>,
)
