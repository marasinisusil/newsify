import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: "general",
    pagesize: 6
  }

  static propTypes = {
    category: PropTypes.string,
    pagesize: PropTypes.number,
  }

  capitalized = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalized(this.props.category)} - Newsify`;
  }

  async componentDidMount() {
    await this.fetchArticles(this.state.page);
  }

  fetchArticles = async (page) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8eeb0a9c9ba14b22bd183ea2690382ee&page=${page}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false
    });
  };

  fetchMoreData = async () => {
    this.setState((prevState) => ({ page: prevState.page + 1, loading: true }));
    const page = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8eeb0a9c9ba14b22bd183ea2690382ee&page=${page}&pageSize=${this.props.pagesize}`;
    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      this.setState((prevState) => ({
        articles: prevState.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  getCategoryIcon = () => {
    const icons = {
      general: "fa-newspaper",
      sports: "fa-futbol",
      science: "fa-flask",
      health: "fa-heart-pulse",
      business: "fa-chart-line",
      entertainment: "fa-clapperboard",
      technology: "fa-microchip",
    };
    return icons[this.props.category] || "fa-newspaper";
  }

  render() {
    return (
      <>
        <style>{`
          .news-page {
            background: #0d0d0d;
            min-height: 100vh;
            padding-top: 90px;
            padding-bottom: 3rem;
          }

          .news-page-header {
            background: linear-gradient(135deg, #1a1a1a, #111);
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 2rem 0 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
          }

          .category-icon {
            width: 52px;
            height: 52px;
            background: #e63946;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.75rem;
            box-shadow: 0 0 20px rgba(230, 57, 70, 0.4);
          }

          .category-icon i {
            color: #fff;
            font-size: 1.2rem;
          }

          .news-page-title {
            font-size: 1.8rem;
            font-weight: 900;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.3rem;
          }

          .news-page-title span {
            color: #e63946;
          }

          .news-page-subtitle {
            color: rgba(255,255,255,0.35);
            font-size: 0.85rem;
            letter-spacing: 0.3px;
          }

          .news-divider {
            width: 50px;
            height: 3px;
            background: #e63946;
            margin: 0.75rem auto 0;
            border-radius: 2px;
          }

          .news-count-badge {
            display: inline-block;
            background: rgba(230, 57, 70, 0.15);
            border: 1px solid rgba(230, 57, 70, 0.3);
            color: #e63946;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.2rem 0.75rem;
            border-radius: 50px;
            margin-top: 0.5rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .news-grid-container {
            background: #0d0d0d;
          }

          .infinite-scroll-component {
            overflow: visible !important;
          }

          .news-end-message {
            text-align: center;
            color: rgba(255,255,255,0.25);
            font-size: 0.85rem;
            padding: 2rem 0;
            letter-spacing: 0.5px;
          }

          .news-end-message i {
            display: block;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            opacity: 0.3;
          }

          .empty-state {
            text-align: center;
            color: rgba(255,255,255,0.25);
            padding: 4rem 0;
          }

          .empty-state i {
            font-size: 3rem;
            display: block;
            margin-bottom: 1rem;
            opacity: 0.2;
          }
        `}</style>

        <div className="news-page">

          {/* Page Header */}
          <div className="news-page-header">
            <div className="category-icon">
              <i className={`fa-solid ${this.getCategoryIcon()}`}></i>
            </div>
            <h1 className="news-page-title">
              <span>Newsify</span> — {this.capitalized(this.props.category)}
            </h1>
            <p className="news-page-subtitle">
              Top headlines • Updated live
            </p>
            <div className="news-divider"></div>
            {this.state.totalResults > 0 && (
              <span className="news-count-badge">
                {this.state.totalResults.toLocaleString()} articles found
              </span>
            )}
          </div>

          {/* Articles Grid */}
          <div className="news-grid-container">
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner />}
              endMessage={
                <div className="news-end-message">
                  <i className="fa-solid fa-check-circle"></i>
                  You're all caught up!
                </div>
              }
            >
              <div className="container">
                <div className="row g-4">
                  {this.state.articles.length === 0 && !this.state.loading ? (
                    <div className="empty-state">
                      <i className="fa-solid fa-newspaper"></i>
                      No articles found for this category.
                    </div>
                  ) : (
                    this.state.articles.map((element) => (
                      <div className="col-md-4 d-flex justify-content-center" key={element.url}>
                        <Newsitem
                          title={element && element.title ? element.title.slice(0, 20) : ""}
                          description={element && element.description ? element.description.slice(0, 50) : ""}
                          imageurl={element.urlToImage}
                          newsurl={element.url}
                          newsauthor={element.author}
                          date={element.publishedAt}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </InfiniteScroll>
          </div>

        </div>
      </>
    );
  }
}

export default News;