export default function QuizControls(props) {
  return(
    <div className='check-answers-container'>
        {props.isQuizSubmitted.complete && 
          <h3>
            You scored {props.processedQuizData.filter(item => 
              item.userResponse === item.correctAnswer)
              .length}/{props.processedQuizData.length} correct answers
          </h3>
        }
        <button 
          type={props.isQuizSubmitted.complete ? "button" : "submit"}
          onClick={props.isQuizSubmitted.complete ? () => props.handlePlayAgain() : null}
          className='start-btn'
        >
            {props.isQuizSubmitted.complete ? "Play Again" : "Check Answers"}
          </button>
      </div>
  )
}