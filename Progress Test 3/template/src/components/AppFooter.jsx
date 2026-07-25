import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        {/* TODO-08: Hiển thị logo image, appName, copyright, version, course */}
        <div className="d-flex align-items-center justify-content-center mb-2">
          <img src={about.logo} alt="logo" width="24" height="24" className="me-2" />
          <h5 className="mb-0">{about.appName}</h5>
        </div>
        <p className="mb-0">{about.copyright}</p>
        <p className="mb-0 text-muted small">
          Version <span>{about.version}</span> | <span>{about.course}</span>
        </p>
      </div>
    </footer>
  )
}
