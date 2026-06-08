/*

TODO:

  - clean up CSS and design

*/





import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import Question from '../Components/Question'
import QuizControls from '../Components/QuizControls'


export default function Quiz(props) {

//  STATE

  const [processedQuizData, setProcessedQuizData] = useState([])
  const [isQuizSubmitted, setIsQuizSubmitted] = useState({complete: false, attempted: false})

  console.log('processedQuizData: ', processedQuizData)

//  DERIVED STATE

  const allQuestionsAnswered = processedQuizData.every(item => item.userResponse !== null)

//  NAVIGATE HOOK
  const navigate = useNavigate()

//  MAKE SURE WE HAVE THE DATA BEFORE WE TRY TO DO ANYTHING WITH IT

  const quizData = props.apiData?.results //  Only try to access results if data exsists.

  useEffect(() => {

    if(!Array.isArray(quizData)){
      navigate('/')
      return
    }

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

    } else {  //  If multiple choice, shuffle the options

      choicesArr = shuffleOptionsArr(optionsArr)

    }  //  END OF IF STATEMENT

    const processedItem = {
      ...item,
      choices: choicesArr, //  Add the choices property to the item object.
      userResponse: null //  Initialize userResponse to null.
    }


    return processedItem

  })  //  end of quizData map

  setProcessedQuizData(processedData)

  }, [quizData])  //  end of useEffect


//  HANDLE FUNCTIONS

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



  function handleCheckAnswers(event){
    event.preventDefault()

    if(!allQuestionsAnswered){
      alert('Please answer all questions before checking your answers.')
      setIsQuizSubmitted(prev => ({...prev, attempted: true}))
      return
    } else {
      setIsQuizSubmitted(prev => ({...prev, complete: true}))

    }
  }


  
  function handlePlayAgain(){
    setProcessedQuizData([])
    setIsQuizSubmitted({complete: false, attempted: false}) //  check answers submit
    props.setIsSubmitting(false) // home quiz making submit
    props.setApiData(null)
    navigate("/")
  }

  return(      
    <main className='flex'>
      <form className='quiz-form' onSubmit={handleCheckAnswers}>
        <Question 
          processedQuizData={processedQuizData}
          isQuizSubmitted={isQuizSubmitted}
          allQuestionsAnswered={allQuestionsAnswered}
          handleResponseChange={handleResponseChange}
        />

        <QuizControls
          isQuizSubmitted={isQuizSubmitted}
          processedQuizData={processedQuizData}
          handlePlayAgain={handlePlayAgain}
          setIsSubmitting={props.setIsSubmitting}
        />
      </form>
    </main>
      
  ) 
}