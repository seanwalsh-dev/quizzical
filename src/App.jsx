import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

function App() {

  const [formData, setFormData] = useState({
    number: 5,
    category: '',
    difficulty: '',
    type: ''
})

  return (

    <Routes>
      <Route path="/" element=
        {<Home 
          formData={formData}
          setFormData={setFormData}
        />} 
      />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App
