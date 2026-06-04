/*

App
├── Home
│   └── QuizSetupForm
│
└── Quiz
    ├── Question
    │   └── Choice
    │
    └── Results

*/

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

/*

TODO:

  - change to asyn await
  - add error handling

*/

async function handleStartQuiz(){
    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=${formData.number}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`)
        const data = await res.json()

        const decodedApiData = {
          ...data,
          results: data.results.map(item => ({
            category: he.decode(item.category),
            correctAnswer: he.decode(item.correct_answer),
            difficulty: item.difficulty,
            incorrectAnswers: item.incorrect_answers.map(answer => he.decode(answer)),
            question: he.decode(item.question),
            type: item.type
          }))
        }

        setApiData(decodedApiData)
      } catch (error) {
        console.error('Error fetching quiz data: ', error)
      }
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
          setApiData={setApiData}
        />} />
    </Routes>
  )
}

export default App
