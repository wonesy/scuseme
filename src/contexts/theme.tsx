import * as React from 'react'

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}

interface theme {
  foreground: string
  background: string
}

interface ThemeProviderState {
  theme: theme
  toggleTheme: () => void
}

const Context: React.Context<ThemeProviderState> = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {}
})

class ThemeContextProvider extends React.Component<{}, ThemeProviderState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      theme: themes.dark,
      toggleTheme: () => {
        this.setState(s => ({
          theme: s.theme === themes.light ? themes.dark : themes.light
        }))
      }
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

const ThemeContextConsumer = Context.Consumer

export { ThemeContextConsumer, ThemeContextProvider }
