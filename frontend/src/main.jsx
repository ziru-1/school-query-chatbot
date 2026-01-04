import { AuthInitializer } from '@/init/AuthInitializer'
import { ThemeInitializer } from '@/init/ThemeInitializer'
import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'
import { queryClient } from './lib/react-query-client'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <ThemeInitializer>
    <AuthInitializer>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthInitializer>
  </ThemeInitializer>,
)
