import { assign, createMachine } from 'xstate'

const questions = [
  {
    type: 'choice',
    value: 'How about some...?',
    options: [
      'Bla', 'Blubber', 'Badaboing'
    ]
  },
  {
    type: 'choice',
    value: 'Do you think that...?',
    options: [
      'Apple', 'Orange', 'Peach'
    ]
  }
]

const initialContext = {
  questions,
  answers: [],
  intro: {
    visited: false,
    finished: false,
  },
  outro: {
    visited: false,
    finished: false,
  }
}

const actions = {
  resetState: assign({
    ...initialContext
  }),
  introEntered: assign({
    intro: (c) => ({ ...c.intro, visited: true }),
  }),
  introFinished: assign({
    intro: (c) => ({ ...c.intro, finished: true }),
  }),
  outroEntered: assign({
    outro: (c) => ({ ...c.outro, visited: true }),
  }),
  outroFinished: assign({
    outro: (c) => ({ ...c.outro, finished: true }),
  }),
  outroFinished: assign({
    outro: (c) => ({ ...c.outro, finished: true }),
  }),
  answerSubmitted: assign({
    answers: (c) => [...c.answers, 'Answer'],
  }),
}

const guards = {
  isIntro: (c, e) => {
    return !c.intro.finished
  },
  isOutro: (c, e) => {
    return c.questions.length <= c.answers.length
  },
  isStep: (c, e) => {
    return c.questions.length > c.answers.length
  },
  // isTextarea: (c, e) => {
  //   return false
  // },
  // isValid: (c, e) => {
  //   return true
  // },
  // isInvalid: (c, e) => {
  //   return false
  // }
}

export const questionaireMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEcCucAuBLA9gOwEMsAnMAOgFkB5AVQDkAVAUQBEBiAD1gwI3IIBmfYgAoArAAYJASjZpMuQiXLV6zFolAAHHLCzZ8mkB0QAWABwB2MhICcEgGymxll+avnTAGhABPRAC0TgCMZJ4AzA6WFuEATMEOtsEAvsk+8tyKRKSUNAAyDACSAAp5TAD6AMIAElSFlRUAyszFZMUASoXNhXRMbI1MZZUMRjp6BnhGJgjBEsHWwWIOi6a2tpbBpuGWPv4IYqYSZJbmUaYOYvZOtmKp6eiZ+Nkq+UWlFTV1DeXNTK3VAEFGj9BkxhoUqHQ2CwmAMhiMkCAxvpFFNEMFYpJjpJNot1rFbKYdn5EMtzGQbhctpYHGcaXcQBkJs9cgUSmUqrV6k0WmRAcC4WCipD+jQAEIUQoI7S6FGGRHTYLbUxkUybOZbJaWWKmWK7MzmcJkMQJNXbaLndwMplZZSst4cz7cn68uhUEHwiFQwXDUayiZomZKsRkHWeMSxVzhWyG4l7MkUpYHVYSMThVaxa0PZl2iivdkfLnfX6tRriyUMIp0ADibHaTAAUkK-eNUQr0ZJybYHMrdXZbJHbPqEA47GRgpsdY5dfELlmFE9c-n3pyvjy-mQyxKpVXa-XGlQ8gA1VgtuWTdszWzpinmCTp+-2cLmCfDgLOEMvu-q9MYiPzx4lByPM2RXJ1i15LcK3KJh2naKh2jrJgGHaABNM8A0vJVLFsMhwnCMR3E2FxlksONSWCLsk1MFM0wzACcxyHoUPdEs2k6bpejYAAxHoumqU9EWRTDQEVTxyS2UdCJOCQNkscI33NY4okHJJDXsVMGNtHJuOQmoemrcpegADQYF0N10hh9JrJCm19IT-TbUT0WCQlVQ0xJXFOcwljfLYjlWKJzHsHCCPmLTFx0vTqgMoymFM8zWks6y91hQ8TwwpzjDMENUzEJZVgSeT1OHU5x3sc4rikHt6TSRls208hkpims4oStjmti2D4MQ+sUPQhzW3lZyZjickCW7WIX1iCQdUuPy1gpFT8IsNUyPCCKgPIWgWMSni+MaapMuG7KEHfbZVRm8xMW1DZXOCYd8KOBIlXUjZtgKzaWR2+C9v3BgAXaaUkUck7pgCWIohsHsauTbt02HVznoqtM4m1cJFkzOqbUi8hmFMwGmABRKyCPAE8kKdgoKlY6LxGnyuxuQjZvvYKI0RyiVXcE18Ix2SlQcL67XxgH62JtjqcrAzbObQbz0DaJYjCIkLSkHyn0RyNyQcWJZ3TAdomiIWchFwnxcg8sd2l-d0sEmUhrp06ZtiI1ZguS5nx1qaHDfE1yTvdYlXOGkImNvH4tFomSclmC4IQpD+tphW01DOJdb7JGhxJUbdQpXXowOSHfyx+4Fy2shTbF6PLbM7r45YLpJUaRok8vHXcOd0drxnQkFOzicI2OfXu+DQ0S-qsuWUrqOSzYAAqVuRuWZH73mOZaROB7s+vawro2BwfOk7Uw7IJgKGKBhULYRfTuiI5HFCicokcAdfYJUNCRjeTtRcGjUjqvAOAIBwCMDjcuqhGB2xBg7QMqwjQ0TWO4DGd5LhZz2AEVwIYCqEVOGRZ2G1sYNVxvaAsq5nRsQ6F0KsTAb7TCQaqc0nkfIEXvMOOixxcHph7OsOwlgT4gQdIWNcJN+QeiFF6WhLkLCqmuqmdwBJuF9z2Owk4UQuHRksLw-hy5HRFnXK0N0YjwSQkkUGfKqpXAvziMseIeps6JFCO4NY6ZmGzVuIQyeS5QK6OERLGuu5TGLAnMaSxCQd42LYTeVRGwLAxicLVUugEWQCNIeBfRm4a6xx6oE2J44TQuwzAOV6w5NFdjIokSkPZowpA8UkrxgiyEQT+KY9WDDynrGYZIJRZhgkmhCC4tYusXAn2Yr9ChHFqGBI0WEA+BxZG6m2HYvYlEKRxEcIkHWswYyLBGYwMZLQpnyRmT5CwM0Fnal9kaB+Gk7AvgkBYOctTGJNWirFEyZkOqvJrIExwRxroHyJHeF8swlmBEku5KIO9OwXD4U8xqZBOqtXeSTRFhk67tCmRjMgajtk9iVJzPykQIUnHKdda6+ET6orah8g5csRKnVmES-5ngZLAtmr7DYS1tSVUxJSE+P1WK8koZxGhdKsrg11n8icwVDQ61pBYR6ZUXCuXkk9fsTh+U0F2iWUxEMaJhGlTGSIkMnDmEepsEJrlDRfipO4xJzyK4RzNiTMmFMNBirBogHyDhVQSDvARKaslaTdJmHYH1GIbGBT9e3E+09zYbh6K6ympiaL+yWD5Lyd4TiI3vCGPeM1nyUScILOFxC43V23FLb5HrHZ0KxBjSk6y1n4U1rSPCsTnGySNaYWNTqq5+MrVkhCpilihGiJEHCVgqlzFbT6gZJoaLyQSAQ+18Ly06prbAnUYR00uBwbJM12dmGhj9fvZV+EamruIUwOg7r7by0vO+NyDyXxOEcJiOY5EEBXVDBYGkhxnx+suCfM+F8Br3vpdMSQPrNEnBdsw6MmJLl5s-gfCcH1Vhh11X7GRaG3060kKCs611rAFTlfc68mwS2pCAA */
createMachine({
  id: 'questionaire',
  initial: 'MOUNTED',
  states: {
    MOUNTED: {
      // after: {
      //   3000: {
      //     target: 'EMPTY',
      //   },
      // },
      always: {
        target: 'EMPTY',
      },
    },
    EMPTY: {
      entry: ['resetState'],
      always: {
        target: 'FETCHING_NEXT_STEP',
      },
    },
    FETCHING_NEXT_STEP: {
      initial: 'FETCHING',
      states: {
        FETCHING: {
          on: {
            REJECT: {
              target: 'FETCHING_ERROR',
            },
            RESOLVE: {
              target: 'FETCHING_SUCCESS',
            },
          },
        },
        FETCHING_ERROR: {
          on: {
            RETRY: {
              target: 'FETCHING',
            },
          },
        },
        FETCHING_SUCCESS: {
          always: [
            {
              target: '#questionaire.INTRO_STEP',
              cond: 'isIntro',
            },
            {
              target: '#questionaire.OUTRO_STEP',
              cond: 'isOutro',
            },
            {
              target: '#questionaire.CHOICE_STEP',
              cond: 'isStep',
            },
            // {
            //   target: '#questionaire.TEXTAREA_STEP',
            //   cond: 'isTextarea',
            // },
          ],
        },
      },
    },
    INTRO_STEP: {
      initial: 'PRISTINE',
      entry: ['introEntered'],
      states: {
        PRISTINE: {
          on: {
            NEXT: {
              target: 'PAGE',
            },
          },
        },
        PAGE: {
          on: {
            NEXT: {},
            FINISHED: {
              target: 'END',
            },
          },
        },
        END: {
          entry: ['introFinished'],
          always: {
            target: '#questionaire.FETCHING_NEXT_STEP',
          },
        },
      },
    },
    OUTRO_STEP: {
      initial: 'PRISTINE',
      entry: ['outroEntered'],
      states: {
        PRISTINE: {},
      },
      on: {
        FINISH: {
          target: 'END',
          actions: ['outroFinished'],
        },
        RESTART: {
          target: 'EMPTY',
        },
      },
    },
    CHOICE_STEP: {
      initial: 'PRISTINE',
      states: {
        PRISTINE: {
          on: {
            SELECT: {
              target: 'HAS_SELECTION',
            },
          },
        },
        HAS_SELECTION: {
          on: {
            DESELECT: {
              target: 'NO_SELECTION',
            },
            SUBMIT: {
              target: 'SUBMITTING',
            },
          },
        },
        NO_SELECTION: {
          on: {
            SELECT: {
              target: 'HAS_SELECTION',
            },
          },
        },
        SUBMITTING: {
          on: {
            REJECT: {
              target: 'SUBMIT_ERROR',
            },
            RESOLVED: {
              actions: ['answerSubmitted'],
              target: '#questionaire.FETCHING_NEXT_STEP',
            },
          },
        },
        SUBMIT_ERROR: {
          on: {
            RETRY: {
              target: 'HAS_SELECTION',
            },
          },
        },
      },
    },
    TEXTAREA_STEP: {
      initial: 'INVALID',
      states: {
        VALID: {
          on: {
            SUBMIT: {
              target: 'SUBMITTING',
            },
          },
        },
        INVALID: {},
        SUBMITTING: {
          on: {
            REJECT: {
              target: 'SUBMIT_ERROR',
            },
            RESOLVED: {
              target: '#questionaire.FETCHING_NEXT_STEP',
            },
          },
        },
        SUBMIT_ERROR: {
          on: {
            RETRY: {
              target: 'SUBMITTING',
            },
            DISMISS: {
              target: 'VALID',
            },
          },
        },
      },
      on: {
        '*': [
          {
            cond: 'isValid',
            target: '.VALID',
          },
          {
            cond: 'isInvalid',
            target: '.INVALID',
          },
        ],
      },
    },
    END: {
      type: 'final',
    },
  },
  context: initialContext,
},
{
  actions,
  guards
}
)