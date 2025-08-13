import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import HomePage from './pages/HomePage'

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default App
