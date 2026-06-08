import { Fragment } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import Choice from './Choice'
import { clsx } from 'clsx'


export default function Question(props) {

  const itemRefs = useRef([])

  useEffect(() => {
      if(!props.isQuizSubmitted.attempted) return

        const indexToScroll = props.processedQuizData.findIndex(item => item.userResponse === null)

        if(indexToScroll !== -1){
          itemRefs.current[indexToScroll]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
    }, [props.isQuizSubmitted, props.processedQuizData])

  const displayItems = props.processedQuizData.map((item, questionIndex) => {
    
  const diffStyles = clsx({
    'diff-easy': item.difficulty === 'easy',
    'diff-medium': item.difficulty === 'medium',
    'diff-hard': item.difficulty === 'hard',
  })

  const catStyles = clsx({
    'cat-general': item.category === 'General Knowledge',
    'cat-books': item.category === 'Entertainment: Books',
    'cat-film': item.category === 'Entertainment: Film',
    'cat-music': item.category === 'Entertainment: Music',
    'cat-musicals': item.category === 'Entertainment: Musicals & Theatres',
    'cat-tv': item.category === 'Entertainment: Television',
    'cat-video-games': item.category === 'Entertainment: Video Games',
    'cat-board-games': item.category === 'Entertainment: Board Games',
    'cat-nature': item.category === 'Science & Nature',
    'cat-comp': item.category === 'Science: Computers',
    'cat-math': item.category === 'Science: Mathematics',
    'cat-mythology': item.category === 'Mythology',
    'cat-sports': item.category === 'Sports',
    'cat-geography': item.category === 'Geography',
    'cat-history': item.category === 'History',
    'cat-politics': item.category === 'Politics',
    'cat-art': item.category === 'Art',
    'cat-celebrities': item.category === 'Celebrities',
    'cat-animals': item.category === 'Animals',
    'cat-vehicles': item.category === 'Vehicles',
    'cat-comics': item.category === 'Entertainment: Comics',
    'cat-gadgets': item.category === 'Science: Gadgets',
    'cat-anime': item.category === 'Entertainment: Japanese Anime & Manga',
    'cat-animations': item.category === 'Entertainment: Cartoon & Animations'
  })

    return (
      <Fragment  key={questionIndex}>
        <article ref={(el) => (itemRefs.current[questionIndex] = el)}>
          <div className="tag-container">
            <span className={`tag category-tag ${catStyles}`}>{item.category}</span>
            <span className={`tag difficulty-tag ${diffStyles}`}>{item.difficulty}</span>
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