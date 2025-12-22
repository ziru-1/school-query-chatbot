import { Routes, Route } from 'react-router'
import ChatPage from './pages/chat/ChatPage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/login/LoginPage'
import { Toaster } from 'sonner'
import AdminLayout from './components/layout/AdminLayout'
import PublicLayout from './components/layout/PublicLayout'
import Dashboard from './pages/admin/Dashboard'
import QAPage from './pages/admin/QAPage'
import Suggestions from './pages/admin/Suggestions'

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          className: 'flex justify-center',
        }}
        position='top-center'
        richColors
      />
      <Routes>
        <Route path='/chat' element={<ChatPage />} />

        <Route element={<PublicLayout />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/qa' element={<QAPage />} />
          <Route path='/admin/suggestions' element={<Suggestions />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
