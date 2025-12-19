import { Routes, Route } from 'react-router'
import ChatPage from './pages/chat/ChatPage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/login/LoginPage'
import AdminPage from './pages/admin/AdminPage'
import { Toaster } from 'sonner'
import ProtectedLayout from './lib/ProtectedLayout'
import PublicLayout from './lib/PublicLayout'

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

        <Route element={<ProtectedLayout />}>
          <Route path='/admin' element={<AdminPage />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
