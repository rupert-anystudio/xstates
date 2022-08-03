import styled, { css } from 'styled-components'

const Tag = styled.div`
  display: inline-block;
  padding: var(--padding-box);
  border-radius: var(--radius-box);
  background: var(--color-tag-bg);
  color: var(--color-tag-txt);
  cursor: auto;
  border: 2px solid transparent;
  border-color: ${props => props.isActive ? 'var(--color-tag-txt)' : 'transparent'};
  ${props => props.appearance === 'success' && css`
    background: var(--color-success-bg);
    color: var(--color-success-txt);
    border-color: ${props => props.isActive ? 'var(--color-success-txt)' : 'transparent'};
  `}
  ${props => props.appearance === 'error' && css`
    background: var(--color-error-bg);
    color: var(--color-error-txt);
    border-color: ${props => props.isActive ? 'var(--color-error-txt)' : 'transparent'};
  `}
  > span {
    display: block;
  }
`

export default Tag