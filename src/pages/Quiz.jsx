import { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Quiz(props) {

//  STATE

  // const [responses, setResponses] = useState([])  
  const [processedQuizData, setProcessedQuizData] = useState([])
  
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
    
    const displayOptions = item.choices.map((option, optionIndex) => (
      <label key={`${questionIndex}-${optionIndex}`} className="choice-label">
            <input 
                type='radio'
                name={questionIndex}
                value={option}
                className="choice-input"
                onChange={(e) => handleResponseChange(e) }
              />
            {option}
          </label>
    ))

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

  })

//  HANDLE RESPONSE CHANGE

/*

NOTES
********************************************************************************
  - instead of handleResponseChange -> handleCheckAnswers

    - handleResponseChange adds userResponse to processedQuizData ->
      handleCheckAnswer compares userResponse to correctAnswer

********************************************************************************

*/

  function handleResponseChange(e){
    
    console.log(e.target)

    setProcessedQuizData(prevData => {
       //  e.target.name == processedQiuzData index 
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

    console.log('processedQuizData: ', processedQuizData)

    const checkedResponses = processedQuizData.map(item => {
      if(item.userResponse === item.correctAnswer){
        console.log(`Number ${processedQuizData.indexOf(item) + 1} is correct!`)
        //  background of selected checkbox turns green
      } else {
        console.log(`Number ${processedQuizData.indexOf(item) + 1} is incorrect.`)
        //  background of selected checkbox turns red
        //  background of correct answer turns green
      }
    })
    return checkedResponses
    // You scorced 3/5 correct answers
    // button turns to 'Play again'
      //  clicking 'Play again' resets the quiz and takes you back to the home page
  }

  return(
    <form className='quiz-form' onSubmit={handleCheckAnswers}>
      {displayItems}
      <button type="submit" className='start-btn'>Check Answers</button>
    </form>
  ) 
}