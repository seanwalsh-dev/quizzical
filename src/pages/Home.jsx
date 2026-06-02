/*

App
├── Home
│   └── QuizSetupForm ***
│
└── Quiz
    ├── Question
    │   └── Choice
    │
    └── Results

*/

import { useNavigate } from "react-router-dom"

export default function Home(props){


//  onChange's

function handleFormDataChange(event){
  const { name, value } = event.target

  props.setFormData(prev =>({
    ...prev,
    [name]: value
  }))

}

const navigate = useNavigate()

  return(
      <main className='flex'>
        <h1>Quizzical</h1>
        <form 
          id='setup-quiz' 
          className='flex' 
          onSubmit={(e) =>{
            e.preventDefault()
            props.handleStartQuiz()
            navigate('/quiz')
          }} 
        >

          <label htmlFor='num-of-questions'>Number of Questions: 
            <input 
              type='number' 
              id='num-of-questions' 
              name='number' 
              min='1' 
              max='50' 
              value={props.formData.number}
              onChange={handleFormDataChange}
            />

          </label>
          <label htmlFor='category'>Select a Category: 
            <select 
              name='category' 
              id='category' 
              onChange={handleFormDataChange}
            >
              <option value="">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>

          <label htmlFor="difficulty">Select Difficulty: 
            <select 
              id="difficulty" 
              name="difficulty"
              onChange={handleFormDataChange}
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <label htmlFor="type">Select Type:
            <select 
              id="type" 
              name="type"
              onChange={handleFormDataChange}
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>

          <button 
          className='start-btn' 
          type='submit'
          // onClick={() =>{
            
          //   window.location.href='./quiz'
          // }} 
        >Start Quiz</button>

        </form>

        
      </main>
    )
}