import { Fragment } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import Choice from './Choice'


export default function Question(props) {

  const itemRefs = useRef([])

  useEffect(() => {
      if(!props.isQuizSubmitted.attempted) return

        const indexToScroll = props.processedQuizData.findIndex(item => item.userResponse === null)
        console.log('indexToScroll: ', indexToScroll)

        if(indexToScroll !== -1){
          itemRefs.current[indexToScroll]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
    }, [props.isQuizSubmitted, props.processedQuizData])

  const displayItems = props.processedQuizData.map((item, questionIndex) => {
    
    

    return (
      <Fragment  key={questionIndex}>
        <article ref={(el) => (itemRefs.current[questionIndex] = el)}>
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