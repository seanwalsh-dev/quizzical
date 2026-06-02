import { clsx } from 'clsx'

export default function Choice(props) {
      const displayOptions = props.item.choices.map((option, optionIndex) => {

      const styles = clsx({
        'choice-label': true,
        'selected-choice': props.item.userResponse === option && !props.isQuizSubmitted.complete,
        'hovered-choice': !props.isQuizSubmitted.complete,
        'correct-answer': (props.item.userResponse && option === props.item.correctAnswer) && props.isQuizSubmitted.complete,
        'incorrect-answer': (props.item.userResponse === option && option !== props.item.correctAnswer) && props.isQuizSubmitted.complete,
        'unanswered': !props.item.userResponse && props.isQuizSubmitted.attempted && !props.allQuestionsAnswered
      })

      return(
        <label key={`${props.questionIndex}-${optionIndex}`} className={styles}>
            <input 
                type='radio'
                name={props.questionIndex}
                value={option}
                className="choice-input"
                onChange={(e) => props.handleResponseChange(e) }
              />
            {option}
          </label>
      )
  })  // End of displayOptions map
  return displayOptions
}