import { Fragment } from 'react'
import Choice from './Choice'


export default function Question(props) {

  const displayItems = props.processedQuizData.map((item, questionIndex) => {

// <Questions />  ./  <Choice /> **********************************************************************************************************************************************************************


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
            <Choice 
              item={item}
              questionIndex={questionIndex}
              isQuizSubmitted={props.isQuizSubmitted}
              allQuestionsAnswered={props.allQuestionsAnswered}
              handleResponseChange={props.handleResponseChange}
            />
          </div>
        </article>
        <hr />
      </Fragment >
    )
  })  //  End of displayItems map

  return displayItems
}