import { useMachine } from '@xstate/react'
import { useEffect } from 'react'
import GalleryMachine from './GalleryMachine'
import GalleryViewBasic from './GalleryViewBasic'
import GalleryViewAlternate from './GalleryViewAlternate'

const Gallery = () => {
  const [state, send, service] = useMachine(GalleryMachine, { devTools: true })

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      console.log(state)
    })
    return subscription.unsubscribe
  }, [service])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
      <GalleryViewBasic state={state} send={send} />
      <GalleryViewAlternate state={state} send={send} />
    </div>
  )
}

export default Gallery