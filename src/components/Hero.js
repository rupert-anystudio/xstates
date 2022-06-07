import { useMachine } from '@xstate/react'
import HeroMachine from './HeroMachine'

const Hero = () => {
  const [state, send] = useMachine(HeroMachine)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 20 }}>
      <strong>Hero</strong>
      {state.matches('mounted') && (
        <>
          <span>mounted</span>
          <button onClick={() => send('INVIEWPORT')}>INVIEWPORT</button>
        </>
      )}
      {state.matches('pending') && (
        <>
          <span>pending</span>
          <button onClick={() => send('RESOLVE')}>RESOLVE</button>
          <button onClick={() => send('REJECT')}>REJECT</button>
        </>
      )}
      {state.matches('resolved') && (
        <>
          <span>resolved</span>
        </>
      )}
      {state.matches('rejected') && (
        <>
          <span>rejected</span>
          <button onClick={() => send('RETRY')}>RETRY</button>
          <button onClick={() => send('DISMISS')}>DISMISS</button>
        </>
      )}
      {state.matches('dismissed') && (
        <>
          <span>dismissed</span>
        </>
      )}
      {!state.done && state.can('CLICK') && (
        <>
          <button onClick={() => send('CLICK')}>CLICK</button>
        </>
      )}
    </div>
  )
}

export default Hero