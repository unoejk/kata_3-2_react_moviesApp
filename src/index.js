
// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// style
import './styles/reset.css'

// App
import App from './components/App/App'


// ---- go-go

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
