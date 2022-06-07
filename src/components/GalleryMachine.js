import { assign, createMachine, interpret } from 'xstate'

const entries = [
  'Christopher Sullivan',
  'Larry Rodriguez',
  'Laura Clarke',
  'Johnny Johnson',
  'Jorge Ryan',
  'Rebecca Riley',
  'Steven George',
  'Alexandra Morse',
  'Debra Ali',
  'Victoria Haley',
  'Charles Daniel',
  'Melissa Cook',
  'Robert Reed',
  'Cory Adams',
  'Christopher Johnson',
  'Mary Whitaker',
  'Charles Orozco',
  'Christina Clark',
  'Nicole Gray',
  'Andrew Edwards',
  'Jordan Caldwell',
  'Mr. Michael Mitchell',
  'Michael Wilson',
  'Jennifer Allen',
  'Manuel Matthews',
  'Brian Hill',
  'Michael Anderson',
  'John Wilson',
  'Sean Contreras',
  'Heather Hamilton DDS',
  'Travis Mcdonald',
  'Lee Rodriguez Jr.',
  'Tara May',
  'Evelyn Mayo',
  'Jessica Mcgee',
  'Diana Yoder',
  'Heather Rosales DVM',
  'Deborah Medina',
  'Diana Bradley',
  'Alexander Curry',
]

const promiseMachine = createMachine(
  {
    id: 'gallery',
    initial: 'mount',
    context: {
      entries: [],
      selectedEntries: {},
      entryShop: {},
      focusedEntry: null,
      amount: 0,
      amountMin: 1,
      amountMax: 12,
    },
    states: {
      mount: {
        after: {
          10: {
            target: 'fetching',
          },
        },
      },
      fetching: {
        after: {
          200: {
            target: 'resolved',
          },
        },
        on: {
          RESOLVE: {
            target: 'resolved',
          },
          REJECT: {
            target: 'rejected',
          },
        },
      },
      resolved: {
        entry: ['receiveEntries'],
        always: [
          {
            target: 'selection',
          },
        ],
      },
      rejected: {
        on: {
          RETRY: {
            target: 'fetching',
          },
        },
      },
      selection: {
        on: {
          FOCUS_ENTRY: {
            actions: ['focusEntry'],
          },
          INCREASE_ENTRY_AMOUNT: {
            actions: ['increaseEntryAmount', 'setAmount'],
          },
          DECREASE_ENTRY_AMOUNT: {
            actions: ['decreaseEntryAmount', 'setAmount'],
            cond: 'canDecreaseAmount',
          },
          REMOVE_ENTRY: {
            actions: ['removeEntry', 'setAmount'],
          },
          SAVE_SELECTION: {
            target: 'checkout',
            cond: 'hasValidAmount',
          },
        },
      },
      checkout: {
        on: {
          CHANGE_SELECTION: {
            target: 'selection',
          },
          SUBMIT_SELECTION: {
            target: 'submitting',
          },
        }
      },
      submitting: {
        after: {
          1400: {
            target: 'submittingResolved',
          },
        },
        entry: ['onSubmit'],
        on: {
          RESOLVE: {
            target: 'submittingResolved',
          },
          REJECT: {
            target: 'submittingRejected',
          },
        },
      },
      submittingResolved: {
        final: true,
        on: {
          RESET: {
            target: 'selection',
            actions: ['resetSelection']
          },
        },
      },
      submittingRejected: {
        on: {
          RETRY: {
            target: 'submitting',
          },
          RESET: {
            target: 'selection',
            actions: ['resetSelection']
          },
        },
      },
    },
  },
  {
    actions: {
      onSubmit: (c, e) => {
        const selection = c.entries
          .map(entry => ({ entry, amount: c.entryShop[entry] }))
          .filter(entry => entry.amount >= 1)
        console.log('onSubmit', selection)
      },
      resetSelection: assign({
        selectedEntries: {},
        entryShop: {},
        focusedEntry: null,
      }),
      focusEntry: assign({
        focusedEntry: (c, e) => e?.entry,
      }),
      receiveEntries: assign({
        entries,
        entryShop: entries.reduce((acc, entry) => { return { ...acc, [entry]: 0 } }, {}),
      }),
      removeEntry: assign({
        entryShop: (c, e) => {
          const entry = e?.entry
          if (!entry) return c.entryShop
          return {
            ...c.entryShop,
            [entry]: 0
          }
        },
      }),
      setAmount: assign({
        amount: (c, e) => {
          return c.entries.reduce((acc, entry) => {
            const amount = c.entryShop[entry] || 0
            return acc + amount
          }, 0)
        },
      }),
      increaseEntryAmount: assign({
        entryShop: (c, e) => {
          const entry = e?.entry
          if (!entry) return c.entryShop
          const currentAmount = c.entryShop[entry] || 0
          return {
            ...c.entryShop,
            [entry]: currentAmount + 1
          }
        },
      }),
      decreaseEntryAmount: assign({
        entryShop: (c, e) => {
          const entry = e?.entry
          if (!entry) return c.entryShop
          const currentAmount = c.entryShop[entry] || 0
          return {
            ...c.entryShop,
            [entry]: Math.max(0, currentAmount - 1)
          }
        },
      }),
    },
    guards: {
      hasValidAmount: (c, e) => {
        return c.amount >= c.amountMin && c.amount <= c.amountMax
      },
      canDecreaseAmount: (c, e) => {
        const entry = e?.entry
        const amount = c?.entryShop[entry] || 0
        return amount >= 1
      },
    }
  },
)

export default promiseMachine