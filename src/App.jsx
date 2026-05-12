// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

function App() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App
