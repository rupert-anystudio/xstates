import { createMachine } from 'xstate'

export const loaderMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBsD2BDCYBOA6ADmAHYQCWRUAxAEoCiAUrQMIAqio+qspALqakXYgAHogCsAZgAsuAGxjJUgIxiAHKtmzVSgDQgAnogC0SgJwB2XKYBMpideuqpABlXXzEsQF8vetJhwCYjIKGloAZQB5ABkANVohTm4+ASFRBDFbXClHc3NbCXMlRwk9QwQje2dcJVUJCVU860z6jx8-DCw8bDAAKzAAYx5IMJZqAE1Erl5+QSQRRCkJWVwG1WctLSV881My43Nq2SkcqXyxU2crs-aQfy7cHv6hkYARAElwgFlP8Knk2ZpRB5aolVSXDQuZwefYVYqqbJiVzber2Uyacw+XwgIioLDweb3QKEEjkKD-GapebpFzWOQSUzbWx2awuMSwozWTS4MRKWTNYqFUy87a3IndOCoZAAN0gFJSc1A6XMylWzj5tVMLjOWo5Ej5uEaWycOVc5lkYs6gSeg2GEHlgOpiFk9VwzmsZi1a2Osl0BmM8NwDnV5z55l5Ugt2PFuDIsAAtqRYLA5fMkpTFQsECqxNl7GirqZ1GYOR7TIiFFq3OrXE5LQFsA6qUrEIUES7GflTCy2XqbDU6oUrs5pLJGVivEA */
createMachine(
  {
  id: "loader",
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