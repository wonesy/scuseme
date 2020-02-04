import React from 'react'
import './App.css'
import { ThemeContextProvider } from './contexts/theme'
import { Frame } from './components/Frame'

function App() {
  return (
    <div>
      <ThemeContextProvider>
        <Frame />
      </ThemeContextProvider>
    </div>
  )
}

export default App
