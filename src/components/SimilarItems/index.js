import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarItems = props => {
  const {similarItem} = props
  const {
    companyLogoUrl,
    rating,
    title,
    jobDescription,
    location,
    employmentType,
  } = similarItem

  return (
    <li className="similar-item-card">
      <div className="similar-item-profile">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-item-logo"
        />
        <div className="similar-item-title-card">
          <h1 className="similar-item-title">{title}</h1>
          <div className="similar-item-star-card">
            <AiFillStar className="star" />
            <p className="similar-item-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-item-description-heading">Description</h1>
      <p className="similar-item-description">{jobDescription}</p>
      <div className="similar-item-location-container">
        <div className="similar-item-location-card">
          <MdLocationOn className="job-item-icon" />
          <p className="job-item-location-text">{location}</p>
        </div>
        <div className="similar-item-location-card">
          <BsBriefcaseFill className="job-item-icon" />
          <p className="job-item-location-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarItems
