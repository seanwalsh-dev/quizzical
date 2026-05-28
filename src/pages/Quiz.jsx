import { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Quiz(props) {

//  STATE

  const [responses, setResponses] = useState([])  
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
    }


    return processedItem

  })  //  END OF MAP

  setProcessedQuizData(processedData)

  }, [quizData])  //  END OF USE EFFECT
  
  
  if(!Array.isArray(quizData)){ //  If quizData is not an array, show loading message.
    return <h1>Loading Quiz...</h1>
  }


//  HANDLE RESPONSE CHANGE

    function handleResponseChange(e){

      setResponses(prevResponses => {
        const filteredResponses = prevResponses.filter(response => response.itemIndex !== Number(e.target.name))  //  Filter out responses from the same question.
        const addResponse = [...filteredResponses, {itemIndex: Number(e.target.name), response: e.target.value}]  //  Add the new response to the filtered responses.
        const sortedFilteredResponses = addResponse.sort((a, b) => a.itemIndex - b.itemIndex)  //  Sort the filtered responses by itemIndex.
        return sortedFilteredResponses
      })

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


// HANDLING CHECK ANSWERS

  function handleCheckAnswers(event){

/*

  +  We need to know the users answers and the correct answers
  -  compare the responses with the correct answers.
    -  for of loop?

*/

    event.preventDefault()

    const correctAnswers = quizData.map((item, index) => ({itemIndex: index, answer: item.correct_answer}))

    
      if(responses.length === correctAnswers.length){
        for (let i = 0; i < correctAnswers.length; i++){
          responses[i].response === correctAnswers[i].answer ?
            console.log(`Number ${correctAnswers[i].itemIndex + 1} is Correct!`) : 
            console.log(`Number ${correctAnswers[i].itemIndex + 1} is Incorrect!`)
        }
      } else {
        console.log('You have not answered all of the questions')
/*
Perhaps setResponses to {itemIndex: #, response: null} for as many items that 
have been selected that way unanswered questions are considered wrong.

And then the first time the button is clicked with a null answer it can give you 
a warning, but on subsequent clicks it grades it as wrong
*/
      }

  }

  return(
    <form className='quiz-form' onSubmit={handleCheckAnswers}>
      {displayItems}
      <button type="submit" className='start-btn'>Check Answers</button>
    </form>
  ) 
}