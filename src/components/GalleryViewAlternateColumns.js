import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'

gsap.registerPlugin(Flip)

const Wrap = styled.div`
  align-self: stretch;
  margin: 0;
  padding: 0;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  grid-column-gap: 15px;
  grid-row-gap: 5px;
  grid-auto-rows: 50px;
`

const Entry = styled.li`
  margin: 0;
  padding: 0;
  grid-column: 2;
  grid-row-end: span 1;
  &.outsideBasket.isIdle {
    grid-column: 2;
    grid-row-end: span 1;
  }
  &.outsideBasket.isFocused {
    grid-column: 2;
    grid-row-end: span 2;
  }
  &.inBasket.isIdle {
    grid-column: 1;
    grid-row-end: span 3;
  }
  &.inBasket.isFocused {
    grid-column: 1;
    grid-row-end: span 4;
  }
`

const Card = styled.div`
  box-sizing: border-box;
  height: 100%;
  position: relative;
  padding: 8px 10px;
  margin: 0;
  flex: 1 0 auto;
  background-color: white;
  box-shadow: 2px 4px 12px -6px rgba(0,0,0,0.4);
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  /* ${Entry}.inBasket & {
    border-color: lightcoral;
  } */
`

const CardActions = styled.div`
  padding: 20px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: none;
  ${Entry}.inBasket &, ${Entry}.isFocused & {
    display: block;
  }
  button {
    cursor: pointer;
    position: relative;
    line-height: 30px;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    text-align:center;
    background-color: white;
    border: 1px solid white;
    box-shadow: 1px 2px 8px -2px rgba(0,0,0,0.8);
    font-size: 16px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 0 0 5px;
    padding: 0;
    &:hover {
      border-color: currentColor;
    }
  }
`

const Amount = styled.div`
  font-size: 50px;
  display: inline-block;
  position: absolute;
  top: 30px;
  left: 20px;
`

const GalleryViewAlternateColumns = ({ state, amount, entryObjects, onDecreaseClick, onIncreaseClick, onCardClick }) => {
  const wrap = useRef()
  const q = useMemo(() => gsap.utils.selector(wrap), [])
  // const q = gsap.utils.selector(wrap)

  const [layout, setLayout] = useState({
    entryObjects: [],
  })

  useLayoutEffect(() => {
    const flipState = Flip.getState(q('.entry'))
    setLayout(prev => ({
      ...prev,
      entryObjects: entryObjects || prev.entryObjects,
      amount: amount || prev.amount,
      state: flipState,
    }))
  }, [amount, entryObjects, state.context, q])

  useLayoutEffect(() => {
    if (!layout.state) return
    console.log('run timeline')
    const tl = gsap
      .timeline({
        defaults: {
          duration: .3,
          ease: 'power1.inOut',
        }
      })
      .to(q('.entry.outsideBasket:not(.isFocused) .amount'), {
        autoAlpha: 0,
      })
      .add(
        Flip.from(layout.state, {
          duration: .3,
          ease: 'power1.inOut',
          absolute: true, 
          targets: q('.entry'),
          scale: false,
          simple: true,
        }),
        '<'
      )
      .to(q('.entry.inBasket .amount, .entry.outsideBasket.isFocused .amount'), {
        autoAlpha: 1,
      })
    return () => {
      tl.kill()
    }
  }, [layout, q])

  const entriesOutside = layout.entryObjects.reduce((acc, entryObject) => {
    if (entryObject.inBasket) return acc
    const index = acc.length
    const entry = { ...entryObject, index }
    acc[index] = entry
    return acc
  }, [])

  const entriesInside = layout.entryObjects.reduce((acc, entryObject) => {
    if (!entryObject.inBasket) return acc
    const index = acc.length
    const entry = {...entryObject, index }
    acc[index] = entry
    return acc
  }, [])

  return (
    <Wrap ref={wrap}>
      <List className='list'>
        {[...entriesOutside, ...entriesInside]
          // .filter(e => !e.inBasket)
          .map(entry => {
            return (
              <Entry
                key={entry.key}
                index={entry.index}
                className={['entry', entry.inBasket ? 'inBasket' : 'outsideBasket', entry.isFocused ? 'isFocused' : 'isIdle'].filter(Boolean)}
                // style={{ transform: entry.inBasket ? `translateY(${entry.index * 46}px)` : undefined }}
              >
                <Card
                  onClick={e => {
                    e.stopPropagation()
                    onCardClick(entry.key)
                  }}
                >
                  <span>
                    {`${entry.key}`}
                  </span>
                  <Amount className='amount'>
                    {entry.amount}
                  </Amount>
                  <CardActions className='cardActions'>
                    <button
                      disabled={!state.can('INCREASE_ENTRY_AMOUNT')}
                      onClick={e => {
                        e.stopPropagation()
                        onIncreaseClick(entry.key)
                      }}
                    >
                      ➕
                    </button>
                    {entry.amount >= 1 && (
                      <button
                        disabled={!state.can('INCREASE_ENTRY_AMOUNT')}
                        onClick={e => {
                          e.stopPropagation()
                          onDecreaseClick(entry.key)
                        }}
                      >
                        ➖
                      </button>
                    )}
                  </CardActions>
                </Card>
              </Entry>
            )
          })
        }
      </List>
    </Wrap>
  )
}

export default GalleryViewAlternateColumns