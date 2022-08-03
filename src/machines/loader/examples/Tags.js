import styled, { keyframes } from 'styled-components'
import Button from '../../../components/Button'
import Tag from '../../../components/Tag'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const FadeOut = styled.div`
  animation: ${fadeOut} .6s forwards;
  animation-delay: .8s;
`

const FadeIn = styled.div`
  animation: ${fadeIn} .6s forwards;
  animation-delay: 0;
`

export const Tags = props => {
  const { state, send } = props
  return (
    <>
      {state.matches('PENDING') && (
        <FadeIn>
          <Tag appearance='default'>{'Loading ...'}</Tag>
        </FadeIn>
      )}
      {state.matches('REJECTED') && (
        <Tag appearance='error'>{'Something went wrong'}</Tag>
      )}
      {state.matches('RESOLVED') && (
        <FadeOut>
          <Tag>{'Loading finished'}</Tag>
        </FadeOut>
      )}
      {state.can('RETRY') && (
        <Button onClick={() => { send('RETRY') }} style={{ marginTop: '.5rem' }}>{'Try again'}</Button>
      )}
    </>
  )
}