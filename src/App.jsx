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

function handleStartQuiz(){
    fetch(`https://opentdb.com/api.php?amount=${formData.number}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`)
      .then(res => res.json())
      .then(data => console.log('call: ', 'data: ', data))
  }

  return (

    <Routes>
      <Route path="/" element=
        {<Home 
          formData={formData}
          setFormData={setFormData}
          handleStartQuiz={handleStartQuiz}
        />} 
      />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App
