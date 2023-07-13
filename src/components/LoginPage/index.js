import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsg: '', isCorrect: false}

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const data = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    const token = await response.json()

    if (response.ok === true) {
      Cookies.set('jwt_token', token.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: token.error_msg, isCorrect: true})
    }
  }

  render() {
    const {username, password, isCorrect, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-container">
          <div className="login-icon-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-image"
            />
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-card">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                value={username}
                id="username"
                type="text"
                className="input-element"
                placeholder="Username"
                onChange={this.changeUserName}
              />
            </div>
            <div className="input-card">
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                value={password}
                id="password"
                type="password"
                className="input-element"
                placeholder="Password"
                onChange={this.changePassword}
              />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
            {isCorrect ? <p className="error-message">{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
