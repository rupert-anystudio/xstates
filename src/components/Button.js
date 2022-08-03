import styled from 'styled-components'

const Button = styled.div`
  background: var(--color-button-bg);
  color: var(--color-button-txt);
  appearance: none;
  border: none;
  display: inline-block;
  padding: var(--padding-box);
  border-radius: var(--radius-box);
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background: var(--color-button-hover-bg);
      color: var(--color-button-hover-txt);
    }
  }
  /* font-size: 2.2rem; */
  border: 2px solid transparent;
  /* font-weight: 600;
  letter-spacing: 0.01em; */
`

export default Button