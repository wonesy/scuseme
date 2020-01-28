import React from 'react'
import './App.css'
import { ThemeContextProvider } from './contexts/theme'

class App extends React.Component {
  render() {
    return (
      <ThemeContextProvider>
        <div>yo</div>
      </ThemeContextProvider>
    )
  }
}

export default App
