import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import JobPortal from './components/JobPortal'
import AboutJob from './components/AboutJob'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobPortal} />
    <ProtectedRoute exact path="/jobs/:id" component={AboutJob} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
