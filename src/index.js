// Frameworks
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import Store from './store'

// Components
import App from './App'

// Styles
import './index.css'

const StoreInstance = Store()

ReactDOM.render(
  <Provider store={StoreInstance}>
    <App />
  </Provider>,
 document.getElementById('root')
)
