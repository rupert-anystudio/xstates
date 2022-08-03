import styled, { css, keyframes } from 'styled-components'

const svgSpin = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`

const circleSpin = keyframes`
  0%,
  25% {
    stroke-dashoffset: 120;
    transform: rotate(0);
  }
  50%,
  75% {
    stroke-dashoffset: 40;
    transform: rotate(45deg);
  }
  100% {
    stroke-dashoffset: 120;
    transform: rotate(360deg);
  }
`

const Wrap = styled.div`
  transform-origin: 50% 50%;
  transform: scale(1.3);
  color: transparent;
  transition-property: transform, color;
  transition-duration: .4s;
  transition-timing-function: ease-out;
  transition-delay: .1s;
  ${props => props.isSpinning && css`
    transform: scale(1);
    color: currentColor;
    transition-timing-function: ease-in;
    transition-duration: 0s;
    transition-delay: 0s;
  `}
  svg {
    width: 5rem;
    height: 5rem;
    transform-origin: 50% 50%;
    animation: 2s linear infinite ${svgSpin};
    circle {
      transform-origin: 50% 50%;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-dasharray: 145;
      // anim
      animation: 1.4s ease-in-out infinite both ${circleSpin};
    }
  }
`

export const Spinner = ({ state }) => {
  return (
    <Wrap isSpinning={state.matches('PENDING')}>
      <svg viewBox='0 0 50 50'>
        <circle cy={25} cx={25} r={23} />
      </svg>
    </Wrap>
  )
}