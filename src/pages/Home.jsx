import QuizSetupForm from "../Components/QuizSetupForm"

export default function Home(props){


//  onChange's

function handleFormDataChange(event){
  const { name, value } = event.target

  props.setFormData(prev =>({
    ...prev,
    [name]: value
  }))

}



  return(
      <main className='flex'>
        <h1>Quizzical</h1>
        <QuizSetupForm 
          formData={props.formData}
          setFormData={props.setFormData}
          handleFormDataChange={handleFormDataChange}
          handleStartQuiz={props.handleStartQuiz}
          isSubmitting={props.isSubmitting}
          setIsSubmitting={props.setIsSubmitting}
        />        
      </main>
    )
}