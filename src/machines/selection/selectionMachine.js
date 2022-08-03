import { createMachine } from 'xstate'

export const selectionMachine = createMachine(
  {
  id: "selection",
  initial: "PENDING",
  states: {
    PENDING: {
      on: {
        REJECT: {
          target: "REJECTED",
        },
        RESOLVE: {
          target: "RESOLVED",
        },
      },
    },
    RESOLVED: {
      type: "final",
    },
    REJECTED: {
      on: {
        RETRY: {
          target: "PENDING",
        },
        DISMISS: {
          target: "DISMISSED",
        },
      },
    },
    DISMISSED: {
      type: "final",
    },
  },
},
)