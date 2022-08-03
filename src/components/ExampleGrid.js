import React, { useState } from 'react'
import { useMachine } from '@xstate/react'
import styled from 'styled-components'
import Button from './Button'
import Example from './Example'
import { useEffect } from 'react'
import Tag from './Tag'
import { getShortestPaths } from '@xstate/graph'

const Grid = styled.div`
  margin: 0;
  padding: 4rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
`

const FullRow = styled.div`
  grid-column-start: 1;
  grid-column-end: -1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`

const Label = styled.div`
  font-size: 6rem;
`

const Examples = ({ label, examples, machine, machineConfig = {}, onResetClick }) => {
  const [state, send, service] = useMachine(machine, { devTools: true, ...machineConfig })
  const { done = false } = state
  const currentStateId = Object.entries(state?.value ?? {}).map(([key = '', value = '']) => {
    return ['questionaire', key, value].filter(Boolean).join('.')
  })[0]
  const stateIds = Object.keys(state?.machine?.idMap ?? {}).map(key => {
    const values = key.split('.')
    const value = values.filter(v => v !== 'questionaire').join(' / ')
    const isActive = key === currentStateId
    return {
      key,
      isActive,
      value,
      values,
    }
  })
  // const groupedStates = stateIds.reduce((acc, curr) => {
  //   const {
  //     key,
  //     isActive,
  //     value,
  //     values,
  //   } = curr
  //   const patch = values.reduceRight((valacc, valcurr, i) => {
      
  //     return { ...valacc, ...newgroups }
  //   }, { ...acc })
  // }, {})
  return (
    <>
      <FullRow>
        {done && (
          <Button onClick={onResetClick}>{'RESTART'}</Button>
        )}
        {(state?.nextEvents ?? []).map(nextEvent => (
          <Button key={nextEvent} onClick={() => { send(nextEvent) }}>{nextEvent}</Button>
        ))}
      </FullRow>
      <FullRow>
        {currentStateId && (
          <Tag>{currentStateId}</Tag>
        )}
      </FullRow>
      <FullRow>
        {stateIds.filter(v => v.isActive).map(({values, value}) => (
          <React.Fragment key={value}>
            {values.map(v => (
              <Tag key={v}>
                {v}
              </Tag>
            ))}
          </React.Fragment>
        ))}
        {/* {stateIds.map(({value, values, isActive}) => (
          <Tag key={value} isActive={isActive}>
            {values.map(v => (
              <span key={v}>
                {v}
              </span>
            ))}
          </Tag>
        ))} */}
        {/* {isInitial && (
          <Tag>{'INITIAL'}</Tag>
        )}
        {done && (
          <Tag>{'DONE'}</Tag>
        )} */}
      </FullRow>
      {examples.map(({ key, component: Component }) => (
        <Example key={key} label={`${label} example – ${key}`}>
          <Component state={state} send={send} service={service} />
        </Example>
      ))}
    </>
  )
}

const ExampleGrid = ({ label, ...rest }) => {
  const [isMounted, setIsMounted] = useState(true)

  const handleResetClick = () => {
    setIsMounted(false)
  }

  useEffect(() => {
    if (isMounted) return
    setIsMounted(true)
  }, [isMounted])

  return (
    <Grid>
      <FullRow>
        {label && <Label>{label}</Label>}
      </FullRow>
      {!isMounted && (
        <>
          <FullRow style={{ opacity: 0 }}>
            <Tag>{`Resetting`}</Tag>
          </FullRow>
          <Example label='Resetting' style={{ opacity: 0 }} />
        </>
      )}
      {isMounted && (
        <Examples {...rest} label={label} onResetClick={handleResetClick} />
      )}
    </Grid>
  )
}

export default ExampleGrid