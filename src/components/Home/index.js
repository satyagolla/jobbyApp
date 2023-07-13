import {Link} from 'react-router-dom'

import Navbar from '../Navbar'
import './index.css'

const Home = () => (
  <div className="home-page-container">
    <Navbar />
    <div className="home-card">
      <h1 className="home-heading">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="home-text">
        Millions of people are searching for jobs, salary <br />
        information, company reviews. Find the job that fits <br />
        your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="find-job-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
