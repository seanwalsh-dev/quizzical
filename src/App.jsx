import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

import he from 'he' //  Importing the 'he' library to decode HTML entities in the quiz questions and answers.
// import {decode} from 'html-entities';



function App() {

//  STATE

  const [formData, setFormData] = useState({
    number: 5,
    category: '',
    difficulty: '',
    type: ''
})

const [apiData, setApiData] = useState(null)

console.log('API Data: ', apiData)

//  USING FORMDATA STATE FOR THE API

function handleStartQuiz(){
    fetch(`https://opentdb.com/api.php?amount=${formData.number}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`)
      .then(res => res.json())
      .then(data =>{

        const decodedApiData = {
          ...data,
          results: data.results.map(item => ({
          ...item,
          question: he.decode(item.question),
          correct_answer: he.decode(item.correct_answer),
          incorrect_answers: item.incorrect_answers.map(answer => he.decode(answer))
          }))
        }

        setApiData(decodedApiData)
      })
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
      <Route path="/quiz" element=
        {<Quiz 
          apiData={apiData}
        />} />
    </Routes>
  )
}

export default App
