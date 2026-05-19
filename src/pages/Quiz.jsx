import { Fragment } from 'react'

export default function Quiz(props) {
    
  // console.log('API Data: ', props.apiData)
  
//  MAKE SURE WE HAVE THE DATA BEFORE WE TRY TO DO ANYTHING WITH IT

  const quizItems = props.apiData?.results //  Only try to access results if data exsists.
  if(!Array.isArray(quizItems)){ //  If quizItems is not an array, return.
    return <h1>Loading Quiz...</h1>
  }

// MAPPING THROUGH quizItems

  const quiz = quizItems.map((item, index) =>{

    const questionIndex = index

//  CREATE AN ARRAY OF BOTH CORRECT AND INCORRECT ANSWERS

    const optionsArr = 
    item.incorrect_answers.includes(item.correct_answer) ?
      [...item.correct_answer] : 
      [...item.incorrect_answers, item.correct_answer]

//  CHECK IF THE QUESTION IS BOOLEAN OR MULTIPLE CHOICE
    let displayOptions
//  IF BOOLEAN

    if(item.type === 'boolean'){

//  MAP THROUGH OPTIONS TO DISPLAY THE CORRECT ORDER

      const booleanOptions = optionsArr[0] === 'True' ?
        optionsArr :  //  If the first incorrect answer is 'True', then the options are in the correct order.
        optionsArr.reverse()  //  Otherwise, reverse the order to make 'True' the first option.

//  MAP THROUGH BOOLEAN OPTIONS TO CREATE RADIO BUTTONS

      displayOptions = booleanOptions.map((option, index) => ( 
        <label key={index} className="choice-label">
          <input 
                type='radio'
                // id={index}
                name={questionIndex}
                value={option}
                className="choice-input"
              / >
            {option}
          </label>
    ))

//  IF MULTIPLE CHOICE

    } else {

//  FISHER-YATES SHUFFLE

      function shuffleOptionsArr(array){
        const arr = [...array]
        for (let i = arr.length - 1; i > 0; i--){
          const j = Math.floor(Math.random() * (i + 1))
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
      }

      const shuffledOptions = shuffleOptionsArr(optionsArr)

//  MAP THROUGH SHUFFLED ANSWERS

      displayOptions = shuffledOptions.map((option, index) => (
        <label key={index} className="choice-label">
          <input 
                type='radio'
                // id={index}
                name={questionIndex}
                value={option}
                className="choice-input"
              / >
            {option}
          </label>
      ))
    }  //  END OF IF STATEMENT

//  DISPLAYING THE QUIZ

      return(
        <Fragment  key={index}>
          <article>
            <div className="tag-container">
              <span className="tag category-tag">{item.category}</span>
              <span className="tag difficulty-tag">{item.difficulty}</span>
            </div>
            <h2>{index + 1}. {item.question}</h2>
            <div className='choices-container'>
              {displayOptions}
            </div>
          </article>
          <hr />
        </Fragment >
      )
  })  //  END OF MAP

  return(
    <form className='quiz-form' /*onSubmit={handleCheckAnswers}*/>
      {quiz}
      <button type="submit" className='start-btn'>Check Answers</button>
    </form>
  ) 
}