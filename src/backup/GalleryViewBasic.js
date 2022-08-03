const ViewBasic = ({ state, send }) => {
  const { context } = state
  const { entries, entryShop, amount, amountMax, amountMin } = context
  return (
    <div style={{ display: 'flex', gap: 20, flexDirection: 'column', alignItems: 'flex-start', width: 500, background: 'lightgrey', margin: 10, padding: 10 }}>
      <div>
        <strong>BasicView</strong><br/>
        <i>{`State: ${state.value}`}</i>
      </div>
      <div>
        {(
          <strong>{`${amount} entries selected.`}</strong>
        )}
        {amount < amountMin && (
          <strong>{`Please select at least ${amountMin} entries.`}</strong>
        )}
        {amount > amountMax && (
          <strong>{`Please do not exceed the maximum of ${amountMax} entries.`}</strong>
        )}
      </div>
      {state.matches('fetching') && (
        <>
          <button onClick={() => send({ type: 'RESOLVE' })}>{'RESOLVE'}</button>
          <button onClick={() => send({ type: 'REJECT' })}>{'REJECT'}</button>
        </>
      )}
      {state.matches('rejected') && (
        <>
          <button onClick={() => send({ type: 'RETRY' })}>{'RETRY'}</button>
        </>
      )}
      {state.matches('selection') && (
        <>
          <button
            disabled={!state.can('SAVE_SELECTION')}
            onClick={() => send({ type: 'SAVE_SELECTION' })}
          >
            SAVE_SELECTION
          </button>
          <div style={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            {entries.map(entry => {
              const amount = entryShop[entry] || 0
              const isSelected = amount >= 1
              return (
                <div key={entry}>
                  <button
                    // disabled={isSelected}
                    style={{
                      background: isSelected ? 'blue' : undefined,
                      color: isSelected ? 'white' : undefined,
                      outline: isSelected ? 'none' : undefined,
                      borderColor: isSelected ? 'blue' : undefined,
                    }}
                    onClick={() => send({ type: 'INCREASE_ENTRY_AMOUNT', entry })}
                  >
                    {entry}
                  </button>
                  <>
                    {isSelected && (
                      <>
                        <button
                          onClick={() => send({ type: 'INCREASE_ENTRY_AMOUNT', entry })}
                        >
                          plus
                        </button>
                        {amount >= 2 && (
                          <button
                            onClick={() => send({ type: 'DECREASE_ENTRY_AMOUNT', entry })}
                          >
                            minus
                          </button>
                        )}
                        <button
                          onClick={() => send({ type: 'REMOVE_ENTRY', entry })}
                        >
                          remove
                        </button>
                        <span>{` x ${amount}`}</span>
                      </>
                    )}
                  </>
                </div>
              )
            })}
          </div>
        </>
      )}
      {state.matches('checkout') && (
        <>
          <button
            disabled={!state.can('CHANGE_SELECTION')}
            onClick={() => send({ type: 'CHANGE_SELECTION' })}
          >
            CHANGE_SELECTION
          </button>
          <div style={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            {entries.filter(entry => entryShop[entry] >= 1).map(entry => (
              <button
                key={entry}
              >
                <span>{`${entry} x ${entryShop[entry]}`}</span>
              </button>
            ))}
          </div>
          <button
            disabled={!state.can('SUBMIT_SELECTION')}
            onClick={() => send({ type: 'SUBMIT_SELECTION' })}
          >
            SUBMIT_SELECTION
          </button>
        </>
      )}
      {state.matches('submitting') && (
        <>
          <button
            disabled={!state.can('RESOLVE')}
            onClick={() => send({ type: 'RESOLVE' })}
          >
            RESOLVE
          </button>
          <button
            disabled={!state.can('REJECT')}
            onClick={() => send({ type: 'REJECT' })}
          >
            REJECT
          </button>
        </>
      )}
      {state.matches('submittingRejected') && (
        <>
          <button
            disabled={!state.can('RETRY')}
            onClick={() => send({ type: 'RETRY' })}
          >
            RETRY
          </button>
        </>
      )}
      {['submittingResolved', 'submittingRejected'].some(state.matches) && (
        <>
          <button
            disabled={!state.can('RESET')}
            onClick={() => send({ type: 'RESET' })}
          >
            RESET
          </button>
        </>
      )}
    </div>
  )
}

export default ViewBasic