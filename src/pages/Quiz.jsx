export default function Quiz(props) {
    
  console.log('API Data: ', props.apiData)
  

  const quesAndAns = props.apiData?.results //  Only try to access results if data exsists.

  if(!Array.isArray(quesAndAns)){ //  If quesAndAns is not an array, return.
    return
  }


    const quiz = quesAndAns.map((qna, index) =>{
      return(
        <article key={index}>
          <h2>{index + 1}. {qna.question}</h2>
          <label>
            <input 
              type='radio'
              id={index}
              name={index}
              value={qna.correct_answer}

            / >
          {qna.correct_answer}</label>
            
        </article>
      ) 
    })
  
  return quiz
}