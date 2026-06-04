export default function QuizControls(props) {

  const numOfCorrectAnswers = props.processedQuizData.filter(item => item.userResponse === item.correctAnswer).length
  const numOfQuestions = props.processedQuizData.length
  const percentageScore = Math.round((numOfCorrectAnswers / numOfQuestions) * 100)
  const emoji = percentageScore === 100 ? '🎉' : percentageScore >= 80 ? '☺️' : percentageScore >= 60 ? '🤔' : '😭'

  return(
    <div className='check-answers-container'>
        {props.isQuizSubmitted.complete && 
          <h3>You answered {numOfCorrectAnswers}/{numOfQuestions} questions correctly: {percentageScore}% {emoji}</h3>
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