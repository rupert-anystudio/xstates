import styled from 'styled-components'
import GalleryViewAlternateColumns from './GalleryViewAlternateColumns'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 800px;
  margin: 10px;
  padding: 10px;
  background: lightgrey;
`

const ViewAlternate = ({ state, send }) => {
  const { context } = state
  const { entries, entryShop, amount, focusedEntry } = context

  const entryObjects = entries.map(entry => {
    const entryAmount = entryShop[entry] || 0
    const isFocused = focusedEntry === entry
    return {
      key: entry,
      amount: entryAmount,
      inBasket: entryAmount >= 1,
      isFocused,
    }
  })

  const onDecreaseClick = entry => {
    send({ type: 'DECREASE_ENTRY_AMOUNT', entry })
  }

  const onIncreaseClick = entry => {
    send({ type: 'INCREASE_ENTRY_AMOUNT', entry })
  }

  const onRemoveClick = entry => {
    send({ type: 'REMOVE_ENTRY', entry })
  }

  const onCardClick = entry => {
    send({ type: 'FOCUS_ENTRY', entry })
  }

  return (
    <Wrap>
      <div>
        <strong>AlternateView</strong><br/>
        <i>{`State: ${state.value}`}</i>
      </div>
      <GalleryViewAlternateColumns
        entryObjects={entryObjects}
        onDecreaseClick={onDecreaseClick}
        onIncreaseClick={onIncreaseClick}
        onRemoveClick={onRemoveClick}
        onCardClick={onCardClick}
        state={state}
        amount={amount}
      />
    </Wrap>
  )
}

export default ViewAlternate