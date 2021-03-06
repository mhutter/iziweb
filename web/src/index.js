import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/modal'

import './index.css'
import App from './App'

moment.locale('de-ch')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
