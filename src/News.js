import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    category:"general",
    pagesize:6
  }
  static prosType ={
    category:PropTypes.string,
    pagesize:PropTypes.number,
  }
  capitalized = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
     // Track the total number of articles
    };
    document.title = `${this.capitalized(this.props.category)} - Newsify`;
  }

  async componentDidMount() {
    await this.fetchArticles(this.state.page); // Fetch articles on mount
  }

  fetchArticles = async (page) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8eeb0a9c9ba14b22bd183ea2690382ee&page=${page}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parseddata = await data.json();

    // Make sure to set totalResults correctly
    this.setState({ 
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
    loading:false // Ensure the correct property is used
    });
  };

  forward = async () => {
    // Calculate the maximum page number
    const maxPage = Math.ceil(this.state.totalResults / this.props.pagesize);
    
    if (this.state.page < maxPage) {
      let nextPage = this.state.page + 1;
      this.setState({loading:true})
      await this.fetchArticles(nextPage);
      this.setState({ page: nextPage ,loading:false});
    }
  };

  backward = async () => {
    console.log("this is backward");
    if (this.state.page > 1) {
      let previousPage = this.state.page - 1;
      this.setState({loading:true})
      await this.fetchArticles(previousPage);
      this.setState({ page: previousPage,loading:false });
    }
  };
  fetchMoreData = async () => {
   
    // Increment the page state
    this.setState((prevState) => ({ page: prevState.page + 1, loading: true }));
  
    // Access the updated page state correctly
    const page = this.state.page + 1; // Get the new page value after incrementing
  
    // Construct the URL using the new page value
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8eeb0a9c9ba14b22bd183ea2690382ee&page=${page}&pageSize=${this.props.pagesize}`;
    
    try {
      // Fetch data
      const response = await fetch(url);
      const parsedData = await response.json();
  
      // Update the state with new articles and total results
      this.setState((prevState) => ({
        articles: prevState.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false // Set loading to false after fetching data
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false }); // Ensure loading is set to false on error
    }
  };
  
  render() {
    const maxPage = Math.ceil(this.state.totalResults / this.props.pagesize);
    return (
      <>
      <div style={{ paddingTop: "70px" }}>
  {/* Your content here */}    <h1 className="text-center">Newsify {this.capitalized(this.props.category)} headline</h1>
</div>
  {/* {this.state.loading&&<Spinner></Spinner>} */}
  <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.articles.totalResults}
          loader={this.state.loading ? <Spinner /> : null}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
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
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.backward}>Previous &larr;</button>
          <button type="button" disabled={this.state.page >= maxPage} className="btn btn-primary" onClick={this.forward}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
