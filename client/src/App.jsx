import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Add from './pages/add'
import Update from './pages/update'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
