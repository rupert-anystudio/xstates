import { createMachine } from 'xstate'

const promiseMachine = createMachine(
  {
    id: 'herovideo',
    initial: 'mounted',
    states: {
      mounted: {
        on: {
          INVIEWPORT: { target: 'pending' },
          CLICK: {
            actions: [
              'onWrapperClick',
            ]
          },
        },
      },
      pending: {
        on: {
          RESOLVE: { target: 'resolved' },
          REJECT: { target: 'rejected' },
        },
      },
      resolved: {
        type: 'final',
      },
      rejected: {
        on: {
          RETRY: { target: 'pending' },
          DISMISS: { target: 'dismissed' },
          CLICK: {
            actions: [
              'onWrapperClick',
            ]
          },
        },
      },
      dismissed: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      onWrapperClick: (c, e) => {
        console.log('onWrapperClick', c)
      },
    },
  },
)

export default promiseMachine