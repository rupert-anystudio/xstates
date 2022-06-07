import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { inspect } from '@xstate/inspect'

inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
  iframe: false // open in new window
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
