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
    // console.log('item: ', item)
    // const answersArr = [...item.incorrect_answers]
    // answersArr.includes(item.correct_answer) ? 
    //   null :
    //   answersArr.push(item.correct_answer)

    //   console.log('answers array: ', answersArr)

//  SECOND ATTMEMPT TO SEE IF SPAN WORKS

    const answersArr = 
    item.incorrect_answers.includes(item.correct_answer) ?
      [...item.correct_answer] : 
      [...item.incorrect_answers, item.correct_answer]

//  CHECK IF THE QUESTION IS BOOLEAN OR MULTIPLE CHOICE
    let displayOptions
//  IF BOOLEAN

    if(item.type === 'boolean'){

//  MAP THROUGH OPTIONS TO DISPLAY THE CORRECT ORDER

//  BEGIN WORKING ****************************************************************
      const booleanOptions = answersArr[0] === 'True' ?
        answersArr :  //  If the first incorrect answer is 'True', then the options are in the correct order.
        answersArr.reverse()  //  Otherwise, reverse the order to make 'True' the first option.

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

//  END WORKING ****************************************************************

//  IF MULTIPLE CHOICE

    } else {

//  FISHER-YATES SHUFFLE

      function shuffleAnsArr(array){
        const arr = [...array]
        for (let i = arr.length - 1; i > 0; i--){
          const j = Math.floor(Math.random() * (i + 1))
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
      }

  // console.log('shuffled answers: ', shuffleAnsArr(answersArr))

//  BEGIN WORKING ****************************************************************

      const shuffledAnswers = shuffleAnsArr(answersArr)

//  MAP THROUGH SHUFFLED ANSWERS

      displayOptions = shuffledAnswers.map((answer, index) => (
        <label key={index} className="choice-label">
          <input 
                type='radio'
                // id={index}
                name={questionIndex}
                value={answer}
                className="choice-input"
              / >
            {answer}
          </label>
      ))

//  END WORKING ****************************************************************

    }  //  END OF IF STATEMENT

    //  BEGIN WORKING ****************************************************************

//  DISPLAYING THE QUIZ
      return(
        <Fragment  key={index}>
          <article>
            <h2>{index + 1}. {item.question}</h2>
            <div className='choices-container'>
              {displayOptions}
            </div>
          </article>
          <hr />
        </Fragment >
        
      )

  })  //  END OF MAP




//  END WORKING ****************************************************************
  

  return(
    <form className='quiz-form' /*onSubmit={handleCheckAnswers}*/>
      {quiz}
      <button type="submit" className='start-btn'>Check Answers</button>
    </form>
  ) 
}