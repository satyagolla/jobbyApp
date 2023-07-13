import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {HiExternalLink} from 'react-icons/hi'
import './index.css'
import Navbar from '../Navbar'
import SimilarItems from '../SimilarItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJob extends Component {
  state = {
    jobDetailsList: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    console.log('did mount')
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      console.log(data)
      const updatedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      const similarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetailsList: updatedData,
        similarJobsList: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryToGetDetails = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="about-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="about-failure-image"
      />
      <h1 className="about-failure-heading">Oops something went wrong</h1>
      <p className="about-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="about-failure-button"
        onClick={this.retryToGetDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetailsList, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetailsList

    return (
      <>
        <div className="company-items-container success-card">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <hr />
          <div className="description-container">
            <div className="website-url-card">
              <h1 className="job-item-description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="website-url">
                Visit <HiExternalLink />
              </a>
            </div>

            <p className="job-item-description-text">{jobDescription}</p>
          </div>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skill-list-card">
            {skills.map(eachItem => (
              <li key={eachItem.name} className="skill-card">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <div>
              <h1 className="skills-heading">Life at company</h1>
              <p className="job-item-description-text">
                {lifeAtCompany.description}
              </p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="company-image"
            />
          </div>
        </div>
        <h1 className="skills-heading">Similar Jobs</h1>
        <ul className="similar-items-container">
          {similarJobsList.map(eachItem => (
            <SimilarItems key={eachItem.id} similarItem={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  getJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    console.log('render')
    return (
      <>
        <Navbar />
        <div className="about-job-container">{this.getJobDetailsView()}</div>
      </>
    )
  }
}
export default AboutJob
