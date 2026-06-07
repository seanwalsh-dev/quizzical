// import { useState } from 'react'

export default function QuizSetupForm(props) {

  // const [isSubmitting, setIsSubmitting] = useState(false)

  return(
    <form 
      id='setup-quiz' 
      className='flex' 
      onSubmit={(e) =>{
        e.preventDefault()
        props.setIsSubmitting(true)
        props.handleStartQuiz()
      }} 
    >
      <fieldset disabled={props.isSubmitting}>

        <label htmlFor='num-of-questions'>Number of Questions: 
          <input 
            type='number' 
            id='num-of-questions' 
            className="form-input"
            name='number' 
            min='1' 
            max='50' 
            value={props.formData.number}
            onChange={props.handleFormDataChange}
          />
        </label>
        <label htmlFor='category'>Select a Category: 
          <select 
            name='category' 
            id='category'
            className="form-input"
            onChange={props.handleFormDataChange}
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
            className="form-input"
            name="difficulty"
            onChange={props.handleFormDataChange}
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
            className="form-input"
            name="type"
            onChange={props.handleFormDataChange}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>

        <button 
        className='start-btn' 
        type='submit'
        >{props.isSubmitting ? "Loading Quiz..." : "Start Quiz"}</button>
      </fieldset>
    </form>
  )
}