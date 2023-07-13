import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} className="notification-link">
      <li className="company-item-container">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div className="job-employment-card">
            <h1 className="title-heading">{title}</h1>
            <div className="rating-card">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-job-employment-type-card">
            <div className="location-card">
              <MdLocationOn className="job-item-icon" />
              <p className="job-item-location-text">{location}</p>
            </div>
            <div className="location-card">
              <BsBriefcaseFill className="job-item-icon" />
              <p className="job-item-location-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-item-package-text">{packagePerAnnum}</p>
        </div>
        <hr className="hr-item-line" />
        <div className="description-container">
          <h1 className="job-item-description-heading">Description</h1>
          <p className="job-item-description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
