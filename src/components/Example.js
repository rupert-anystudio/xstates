import styled from 'styled-components'

const Wrap = styled.div`
  background: var(--color-entry-bg);
  overflow: hidden;
  border-radius: var(--radius-box);
`

const Label = styled.div`
  border-bottom: 1px solid var(--color-entry-divider);
  color: var(--color-root-txt-dim);
  padding: 1rem;
`

const Stage = styled.div`
  padding: 1rem;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Example = ({ children, label, ...rest }) => {
  return (
    <Wrap {...rest}>
      {label && <Label>{label}</Label>}
      <Stage>
        {children}
      </Stage>
    </Wrap>
  )
}

export default Example