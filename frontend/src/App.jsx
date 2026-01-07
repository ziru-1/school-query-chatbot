import { Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import PublicLayout from './components/layout/PublicLayout'
import Dashboard from './pages/admin/dashboard/Dashboard'
import ManageAdminsPage from './pages/admin/manage-admins/ManageAdminsPage'
import QAPage from './pages/admin/qa/QAPage'
import SuggestionsPage from './pages/admin/suggestions/SuggestionsPage'
import ChatPage from './pages/chat/ChatPage'
import LoginPage from './pages/login/LoginPage'
import NotFound from './pages/NotFound'

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
          <Route path='/admin/suggestions' element={<SuggestionsPage />} />

          <Route
            path='/admin/manage-admins'
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <ManageAdminsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
