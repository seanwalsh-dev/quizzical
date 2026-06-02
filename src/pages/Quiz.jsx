import { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { clsx } from 'clsx'
import { useNavigate } from "react-router-dom"

export default function Quiz(props) {

//  STATE

  const [processedQuizData, setProcessedQuizData] = useState([])
  const [isQuizSubmitted, setIsQuizSubmitted] = useState({complete: false, attempted: false})

//  DERIVED STATE

  const allQuestionsAnswered = processedQuizData.every(item => item.userResponse !== null)

//  NAVIGATE HOOK
  const navigate = useNavigate()

//  MAKE SURE WE HAVE THE DATA BEFORE WE TRY TO DO ANYTHING WITH IT

  const quizData = props.apiData?.results //  Only try to access results if data exsists.

  useEffect(() => {

    if(!Array.isArray(quizData)) return

    //  FISHER-YATES SHUFFLE

    function shuffleOptionsArr(array){
      const arr = [...array]
      for (let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }

// PROCESS DATA SO IT CAN BE USED TO DISPLAY
  const processedData = quizData.map((item) =>{ // Process quizData to display it
    
    let choicesArr
    const optionsArr = [...item.incorrectAnswers, item.correctAnswer]
  
    if(item.type === 'boolean'){  //  If boolean, True is first

      choicesArr = optionsArr[0] === 'True' ?
        optionsArr :                            //  If 'True' if first, then the options are in the correct order.
        optionsArr.reverse()                    //  Otherwise, reverse the order to make 'True' the first option.

    } else {  //  IF MULTIPLE CHOICE, SHUFFLE THE OPTIONS

      choicesArr = shuffleOptionsArr(optionsArr)

    }  //  END OF IF STATEMENT

    const processedItem = {
      ...item,
      choices: choicesArr, //  Add the choices property to the item object.
      userResponse: null //  Initialize userResponse to null.
    }


    return processedItem

  })  //  END OF MAP

  setProcessedQuizData(processedData)

  }, [quizData])  //  END OF USE EFFECT
  
  
  if(!Array.isArray(quizData)){ //  If quizData is not an array, show loading message.
    return <h1>Loading Quiz...</h1>
  }

//  DISPLAY OPTIONS

  const displayItems = processedQuizData.map((item, questionIndex) => {
    
    const displayOptions = item.choices.map((option, optionIndex) => {

      const styles = clsx({
        'choice-label': true,
        'selected-choice': item.userResponse === option && !isQuizSubmitted.complete,
        'hovered-choice': !isQuizSubmitted.complete,
        'correct-answer': (item.userResponse && option === item.correctAnswer) && isQuizSubmitted.complete,
        'incorrect-answer': (item.userResponse === option && option !== item.correctAnswer) && isQuizSubmitted.complete,
        'unanswered': !item.userResponse && isQuizSubmitted.attempted && !allQuestionsAnswered
      })

      return(
        <label key={`${questionIndex}-${optionIndex}`} className={styles}>
            <input 
                type='radio'
                name={questionIndex}
                value={option}
                className="choice-input"
                onChange={(e) => handleResponseChange(e) }
              />
            {option}
          </label>
      )
  })  // End of displayOptions map

    return (
      <Fragment  key={questionIndex}>
        <article>
          <div className="tag-container">
            <span className="tag category-tag">{item.category}</span>
            <span className="tag difficulty-tag">{item.difficulty}</span>
          </div>
          <h2>{questionIndex + 1}. {item.question}</h2>
          <div className='choices-container'>
            {displayOptions}
          </div>
        </article>
        <hr />
      </Fragment >
    )
  })  //  End of displayItems map

//  HANDLE RESPONSE CHANGE

  function handleResponseChange(e){

    setProcessedQuizData(prevData => {
      const updatedData = prevData.map((item, index) => {
        
        if(index === Number(e.target.name)){
          return {
            ...item,
            userResponse: e.target.value
          }
        } else {
          return item
        } //  END OF IF STATEMENT
      })  //  END OF MAP
      return updatedData
      }) // END of updatedData
  } // END OF handleResponseChange

// HANDLING CHECK ANSWERS

  function handleCheckAnswers(event){
    event.preventDefault()

    if(!allQuestionsAnswered){
      alert('Please answer all questions before checking your answers.')
      setIsQuizSubmitted(prev => ({...prev, attempted: true}))
      return
    } else {
      setIsQuizSubmitted(prev => ({...prev, complete: true}))
    }

    // You scorced 3/5 correct answers
    // button turns to 'Play again'
      //  clicking 'Play again' resets the quiz and takes you back to the home page
  }

  

  function handlePlayAgain(){
    setProcessedQuizData([])
    setIsQuizSubmitted({complete: false, attempted: false})
    props.setApiData(null)
    navigate("/")
  }

  return(
    <form className='quiz-form' onSubmit={handleCheckAnswers}>
      {displayItems}
      <div className='check-answers-container'>
        {isQuizSubmitted.complete && 
          <h3>
            You scored {processedQuizData.filter(item => 
              item.userResponse === item.correctAnswer)
              .length}/{processedQuizData.length} correct answers
          </h3>
        }
        <button 
          type={isQuizSubmitted.complete ? "button" : "submit"}
          onClick={isQuizSubmitted.complete ? () => handlePlayAgain() : null}
          className='start-btn'
        >
            {isQuizSubmitted.complete ? "Play Again" : "Check Answers"}
          </button>
      </div>
    </form>
  ) 
}