export default function Quiz(props) {
    
  console.log('API Data: ', props.apiData)
  
//  MAKE SURE WE HAVE THE DATA BEFORE WE TRY TO DO ANYTHING WITH IT

  const quesAndAns = props.apiData?.results //  Only try to access results if data exsists.
  if(!Array.isArray(quesAndAns)){ //  If quesAndAns is not an array, return.
    return
  }

// MAPPING THROUGH quesAndAns

  const quiz = quesAndAns.map((qna, index) =>{

    const questionIndex = index

//  CREATE AN ARRAY OF BOTH CORRECT AND INCORRECT ANSWERS
    
    const answersArr = qna.incorrect_answers
    answersArr.push(qna.correct_answer)
    console.log('answers 1: ', answersArr)

//  FISHER-YATES SHUFFLE

    function shuffleAnsArr(array){
      const arr = [...array]
      for (let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }
    
    
    console.log('shuffled answers: ', shuffleAnsArr(answersArr))

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
        <h2>{index + 1}. {qna.question}</h2>
        {displayShuffledAns}
      </article>
    ) 
  })
  
  return quiz
}