import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'

import Navbar from '../Navbar'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobPortal extends Component {
  state = {
    userProfile: {},
    jobList: [],
    searchInputText: '',
    apiJobStatus: apiStatusConstants.initial,
    salaryRange: '',
    activeCheckBoxList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobListData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userProfile: profileDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobListData = async () => {
    this.setState({apiJobStatus: apiStatusConstants.inProgress})

    const {searchInputText, salaryRange, activeCheckBoxList} = this.state
    const type = activeCheckBoxList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${salaryRange}&search=${searchInputText}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jobsList = data.jobs

      const updatedList = jobsList.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobList: updatedList,
        apiJobStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = () => {
    const {userProfile} = this.state
    const {name, profileUrl, shortBio} = userProfile

    return (
      <div className="profile-card">
        <img src={profileUrl} alt="profile" className="profile-image" />
        <h1 className="name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  getJobListDetails = () => {
    const {jobList} = this.state

    return jobList.length > 0 ? (
      <ul className="job-list-body-container">
        {jobList.map(eachItem => (
          <JobItem key={eachItem.id} jobItem={eachItem} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  retryProfileDetails = () => {
    this.getProfileData()
  }

  getProfileFailure = () => (
    <div className="profile-failure-card">
      <button
        className="retry-button"
        type="button"
        onClick={this.retryProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  updateCheckBoxList = event => {
    console.log('check')
    const {activeCheckBoxList} = this.state
    if (activeCheckBoxList.includes(event.target.id)) {
      const updatedList = activeCheckBoxList.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({activeCheckBoxList: updatedList}, this.getJobListData)
    } else {
      this.setState(
        prevState => ({
          activeCheckBoxList: [
            ...prevState.activeCheckBoxList,
            event.target.id,
          ],
        }),
        this.getJobListData,
      )
    }
  }

  checkBoxView = () => (
    <ul className="type-container">
      {employmentTypesList.map(eachItem => (
        <li key={eachItem.employmentTypeId} className="type-items">
          <input
            id={eachItem.employmentTypeId}
            type="checkbox"
            className="checkbox"
            onChange={this.updateCheckBoxList}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  updateBaseOnSalary = event => {
    this.setState({salaryRange: event.target.id}, this.getJobListData)
  }

  getSalaryView = () => (
    <ul className="type-container">
      {salaryRangesList.map(eachItem => (
        <li key={eachItem.salaryRangeId} className="type-items">
          <input
            id={eachItem.salaryRangeId}
            type="radio"
            className="radio"
            name="options"
            onChange={this.updateBaseOnSalary}
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getLoader = () => (
    <div className="jobs-list-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  updateSearchInputValue = event => {
    this.setState({searchInputText: event.target.value})
  }

  updateSearchInputJobList = event => {
    if (event.key === 'Enter') {
      this.getJobListData()
    }
  }

  updateSearchInputJobListOnClick = () => {
    this.getJobListData()
  }

  getSearchBar = () => {
    const {searchInputText} = this.state
    console.log('data-testid')
    return (
      <div className="search-input-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInputText}
          onChange={this.updateSearchInputValue}
          onKeyDown={this.updateSearchInputJobList}
        />
        <button
          data-testid="searchButton"
          className="search-button"
          type="button"
          onClick={this.updateSearchInputJobListOnClick}
        >
          <BiSearch className="search-icon" />
        </button>
      </div>
    )
  }

  getProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getProfileDetails()
      case apiStatusConstants.failure:
        return this.getProfileFailure()
      case apiStatusConstants.inProgress:
        return this.getLoader()

      default:
        return null
    }
  }

  retryProfileJobDetails = () => {
    this.getJobListData()
  }

  getJobProfileFailure = () => (
    <div className="job-list-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-view-image"
      />
      <h1 className="job-failure-view-heading">Oops Something went wrong</h1>
      <p className="job-failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="job-failure-view-button"
        onClick={this.retryProfileJobDetails}
      >
        Retry
      </button>
    </div>
  )

  getJobListView = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiStatusConstants.success:
        return this.getJobListDetails()
      case apiStatusConstants.failure:
        return this.getJobProfileFailure()
      case apiStatusConstants.inProgress:
        return this.getLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="body-container">
        <Navbar />
        <div className="jobs-container">
          <div className="small-search-bar-container">
            {this.getSearchBar()}
          </div>
          <div className="profile-checkbox-salary-card">
            {this.getProfileView()}
            <hr />
            <h1 className="type-heading">Type of Employment</h1>
            {this.checkBoxView()}
            <hr />
            <h1 className="type-heading">Salary Range</h1>
            {this.getSalaryView()}
          </div>
          <div className="jobs-list-container">
            <div className="large-search-bar-container">
              {this.getSearchBar()}
            </div>
            {this.getJobListView()}
          </div>
        </div>
      </div>
    )
  }
}
export default JobPortal
