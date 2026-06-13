import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    return (
      <>
        <style>{`
          .news-navbar {
            background: #0a0a0a;
            border-bottom: 3px solid #e63946;
            padding: 0;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1050;
            box-shadow: 0 2px 20px rgba(0,0,0,0.5);
          }

          .news-navbar .container-fluid {
            padding: 0 1.5rem;
          }

          /* Top bar */
          .news-topbar {
            background: #e63946;
            padding: 0.25rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.75rem;
            color: rgba(255,255,255,0.85);
            letter-spacing: 0.3px;
          }

          .news-topbar .breaking {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .breaking-badge {
            background: #fff;
            color: #e63946;
            font-weight: 800;
            font-size: 0.68rem;
            padding: 0.1rem 0.5rem;
            border-radius: 3px;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .breaking-text {
            color: #fff;
            font-size: 0.78rem;
            font-weight: 400;
          }

          .news-topbar .date {
            color: rgba(255,255,255,0.75);
            font-size: 0.75rem;
          }

          /* Brand */
          .news-navbar .navbar-brand {
            font-size: 1.8rem;
            font-weight: 900;
            color: #ffffff !important;
            letter-spacing: -0.5px;
            padding: 0.6rem 0;
            text-transform: uppercase;
          }

          .news-navbar .navbar-brand span {
            color: #e63946;
          }

          /* Nav links */
          .news-navbar .nav-link {
            color: rgba(255,255,255,0.7) !important;
            font-size: 0.82rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            padding: 1.2rem 0.85rem !important;
            transition: all 0.2s ease;
            border-bottom: 3px solid transparent;
            margin-bottom: -3px;
          }

          .news-navbar .nav-link:hover {
            color: #ffffff !important;
            border-bottom: 3px solid #e63946;
          }

          .news-navbar .nav-link.active {
            color: #ffffff !important;
            border-bottom: 3px solid #e63946;
          }

          /* Search */
          .news-search .form-control {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 4px 0 0 4px;
            color: #fff;
            font-size: 0.85rem;
            padding: 0.4rem 0.9rem;
            width: 180px;
            transition: all 0.2s ease;
          }

          .news-search .form-control:focus {
            background: rgba(255,255,255,0.12);
            border-color: #e63946;
            box-shadow: none;
            outline: none;
            color: #fff;
            width: 220px;
          }

          .news-search .form-control::placeholder {
            color: rgba(255,255,255,0.3);
          }

          .news-search .btn-search {
            background: #e63946;
            border: none;
            color: #fff;
            font-size: 0.85rem;
            padding: 0.4rem 0.9rem;
            border-radius: 0 4px 4px 0;
            transition: background 0.2s ease;
            cursor: pointer;
          }

          .news-search .btn-search:hover {
            background: #c1121f;
          }

          /* Toggler */
          .news-navbar .navbar-toggler {
            border-color: rgba(255,255,255,0.2);
            padding: 0.3rem 0.6rem;
          }

          .news-navbar .navbar-toggler-icon {
            filter: invert(1);
            opacity: 0.8;
          }

          .news-navbar .navbar-toggler:focus {
            box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.4);
          }

          /* Offset for fixed navbar */
          .navbar-offset {
            margin-top: 90px;
          }
        `}</style>

        {/* Breaking news top bar */}
        <div className="news-topbar">
          <div className="breaking">
            <span className="breaking-badge">Breaking</span>
            <span className="breaking-text">Stay updated with the latest news from around the world</span>
          </div>
          <span className="date">{new Date().toDateString()}</span>
        </div>

        {/* Main navbar */}
        <nav className="navbar navbar-expand-lg news-navbar">
          <div className="container-fluid">

            <Link className="navbar-brand" to="/">
              News<span>ify</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">Technology</Link>
                </li>
              </ul>

              <form className="d-flex news-search" role="search">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search news..."
                  aria-label="Search"
                />
                <button className="btn-search" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>

          </div>
        </nav>
      </>
    )
  }
}

export default Navbar