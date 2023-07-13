import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <div className="description-card">
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
