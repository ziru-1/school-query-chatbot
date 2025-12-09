import { Routes, Route } from 'react-router'
import Chat from './pages/chat/Chat'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/chat' element={<Chat />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
