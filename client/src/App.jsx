import Index from './components/Login/Index'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css' 

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Index />} />
          <Route path="/signup" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
