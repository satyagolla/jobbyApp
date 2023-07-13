import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Navbar = props => {
  const logoutPortal = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav>
      <div className="nav-container-for-large-device">
        <Link className="link-item" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>

        <ul className="nav-list-card">
          <Link className="link-item" to="/">
            <li className="nav-text">Home</li>
          </Link>
          <Link className="link-item" to="/jobs">
            <li className="nav-text">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={logoutPortal}>
          Logout
        </button>
      </div>
      <div className="nav-container-for-small-device">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>

        <ul className="nav-items-container">
          <Link to="/">
            <li>
              <AiFillHome className="home-icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsBriefcaseFill className="job-icon" />
            </li>
          </Link>
          <Link to="/login">
            <li>
              <FiLogOut className="home-icon" onClick={logoutPortal} />
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Navbar)
