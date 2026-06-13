import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, newsurl, newsauthor, date } = this.props

    const fallbackImage = "https://assets3.cbsnewsstatic.com/hub/i/r/2024/09/27/2efc9ef1-d65f-4755-88b2-59194dd43ebf/thumbnail/1200x630/6c9df5e3f57f9a7fcf766c8a101fd407/img-2928.jpg?v=fa529222a2be3543711c1a879b51e860"

    return (
      <>
        <style>{`
          .news-card {
            background: #1a1a1a;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 12px;
            overflow: hidden;
            width: 21rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          }

          .news-card:hover {
            transform: translateY(-5px);
            border-color: rgba(230, 57, 70, 0.4);
            box-shadow: 0 12px 35px rgba(0,0,0,0.5), 0 0 0 1px rgba(230,57,70,0.2);
          }

          .news-card-img-wrapper {
            position: relative;
            overflow: hidden;
            height: 180px;
          }

          .news-card-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
          }

          .news-card:hover .news-card-img-wrapper img {
            transform: scale(1.05);
          }

          .news-card-img-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(to top, #1a1a1a, transparent);
          }

          .news-card-body {
            padding: 1.1rem 1.2rem 1.3rem;
          }

          .news-card-title {
            font-size: 0.98rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.4;
            margin-bottom: 0.6rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .news-card-description {
            font-size: 0.82rem;
            color: rgba(255,255,255,0.45);
            line-height: 1.5;
            margin-bottom: 0.9rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .news-card-meta {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
          }

          .meta-author {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            color: rgba(255,255,255,0.5);
            font-size: 0.75rem;
          }

          .meta-author i {
            color: #e63946;
            font-size: 0.7rem;
          }

          .meta-dot {
            color: rgba(255,255,255,0.2);
            font-size: 0.7rem;
          }

          .meta-date {
            color: rgba(255,255,255,0.35);
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.35rem;
          }

          .meta-date i {
            font-size: 0.7rem;
            color: rgba(255,255,255,0.25);
          }

          .btn-read-more {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #e63946;
            color: #fff;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.4rem 1rem;
            border-radius: 50px;
            text-decoration: none;
            letter-spacing: 0.3px;
            transition: all 0.25s ease;
            border: none;
            box-shadow: 0 0 14px rgba(230, 57, 70, 0.3);
          }

          .btn-read-more:hover {
            background: #c1121f;
            color: #fff;
            transform: translateY(-1px);
            box-shadow: 0 0 22px rgba(230, 57, 70, 0.5);
          }

          .btn-read-more i {
            font-size: 0.75rem;
            transition: transform 0.2s ease;
          }

          .btn-read-more:hover i {
            transform: translateX(3px);
          }
        `}</style>

        <div className="news-card my-3">

          {/* Image */}
          <div className="news-card-img-wrapper">
            <img
              src={!imageurl ? fallbackImage : imageurl}
              alt={title}
              onError={(e) => { e.target.src = fallbackImage }}
            />
            <div className="news-card-img-overlay"></div>
          </div>

          {/* Body */}
          <div className="news-card-body">

            <h5 className="news-card-title">{title}...</h5>
            <p className="news-card-description">{description}...</p>

            {/* Meta */}
            <div className="news-card-meta">
              <span className="meta-author">
                <i className="fa-solid fa-user"></i>
                {!newsauthor ? "Unknown" : newsauthor}
              </span>
              <span className="meta-dot">•</span>
              <span className="meta-date">
                <i className="fa-regular fa-calendar"></i>
                {new Date(date).toDateString()}
              </span>
            </div>

            <a href={newsurl} target="_blank" rel="noreferrer" className="btn-read-more">
              Read More <i className="fa-solid fa-arrow-right"></i>
            </a>

          </div>
        </div>
      </>
    )
  }
}

export default Newsitem