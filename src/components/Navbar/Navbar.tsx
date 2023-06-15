import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const companyName: String = "DendriteMusic";

export default function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid align-self-start align-self-lg-center">
        <button
          className="navbar-toggler border-0"
          data-bs-toggle="offcanvas"
          data-bs-target=".offcanvas-start"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`offcanvas offcanvas-start ${styles.offcanvas}`}
          tabIndex={-1}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">{companyName}</h5>
            <button
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body align-items-center">
            <ul className="nav flex-column gap-4">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${styles.text}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className={`nav-link ${styles.text}`}>
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favourites" className={`nav-link ${styles.text}`}>
                  Favourites
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className={`nav-link ${styles.text} disabled`}>
                  Playlists
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
