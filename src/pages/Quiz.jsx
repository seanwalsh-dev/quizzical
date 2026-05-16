export default function Quiz(props) {
    
  // console.log('API Data: ', props.apiData)
  
//  MAKE SURE WE HAVE THE DATA BEFORE WE TRY TO DO ANYTHING WITH IT

  const quizItems = props.apiData?.results //  Only try to access results if data exsists.
  if(!Array.isArray(quizItems)){ //  If quizItems is not an array, return.
    return
  }

// MAPPING THROUGH quizItems

  const quiz = quizItems.map((item, index) =>{

    const questionIndex = index

//  CREATE AN ARRAY OF BOTH CORRECT AND INCORRECT ANSWERS
    
    const answersArr = item.incorrect_answers
    answersArr.push(item.correct_answer)



//  CHECK IF THE QUESTION IS BOOLEAN OR MULTIPLE CHOICE

//  IF BOOLEAN

    if(item.type === 'boolean'){
      console.log('boolean question: ', item )
//  WORKING HERE ********************************************************************
      return(
      <article key={index}>
        <h2>{index + 1}. {item.question}</h2>
        {/* {displayShuffledAns} */}
        <p>True or false</p>
      </article>
    ) 
//  WORKING HERE ********************************************************************

//  IF MULTIPLE CHOICE

    } else {
      console.log('multiple choice question: ', item)

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

    const shuffledAnswers = shuffleAnsArr(answersArr)

//  MAP THROUGH SHUFFLED ANSWERS

    const displayShuffledAns = shuffledAnswers.map((answer, index) => (
      <label key={index}>
        <input 
              type='radio'
              // id={index}
              name={questionIndex}
              value={answer}
            / >
          {answer}
        </label>
    ))
      
//  DISPLAYING THE QUIZ

    return(
      <article key={index}>
        <h2>{index + 1}. {item.question}</h2>
        {displayShuffledAns}
      </article>
    ) 
      
    } //  END OF IF STATEMENT


  })
  
  return quiz
}