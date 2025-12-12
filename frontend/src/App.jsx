import { Routes, Route } from 'react-router'
import ChatPage from './pages/chat/ChatPage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/chat' element={<ChatPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
