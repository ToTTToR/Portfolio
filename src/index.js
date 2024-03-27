import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './contexts/theme'
import './index.css'

render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
)