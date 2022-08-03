import ExampleGrid from './components/ExampleGrid'
// import { loaderExamples, loaderMachine } from './machines/loader'
import { questionaireExamples, questionaireMachine } from './machines/questionaire'

function App() {
  return (
    <>
      <ExampleGrid
        label={'Questionaire'}
        examples={questionaireExamples}
        machine={questionaireMachine}
      />
      {/* <ExampleGrid
        label={'Loader'}
        examples={loaderExamples}
        machine={loaderMachine}
      /> */}
    </>
  )
}

export default App
