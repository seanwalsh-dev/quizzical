import { Fragment } from 'react'
import { clsx } from 'clsx'


export default function Questions(props) {

  const displayItems = props.processedQuizData.map((item, questionIndex) => {

// <Questions />  ./  <Choice /> **********************************************************************************************************************************************************************
    const displayOptions = item.choices.map((option, optionIndex) => {

      const styles = clsx({
        'choice-label': true,
        'selected-choice': item.userResponse === option && !props.isQuizSubmitted.complete,
        'hovered-choice': !props.isQuizSubmitted.complete,
        'correct-answer': (item.userResponse && option === item.correctAnswer) && props.isQuizSubmitted.complete,
        'incorrect-answer': (item.userResponse === option && option !== item.correctAnswer) && props.isQuizSubmitted.complete,
        'unanswered': !item.userResponse && props.isQuizSubmitted.attempted && !props.allQuestionsAnswered
      })

      return(
        <label key={`${questionIndex}-${optionIndex}`} className={styles}>
            <input 
                type='radio'
                name={questionIndex}
                value={option}
                className="choice-input"
                onChange={(e) => props.handleResponseChange(e) }
              />
            {option}
          </label>
      )
  })  // End of displayOptions map

// End of <Choice /> **********************************************************************************************************************************************************************

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

  return displayItems
}