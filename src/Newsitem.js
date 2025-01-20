import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageurl,newsurl,newsauthor,date}=this.props
    return (
      <div className='my-3'>
       
        <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src={!imageurl?"https://assets3.cbsnewsstatic.com/hub/i/r/2024/09/27/2efc9ef1-d65f-4755-88b2-59194dd43ebf/thumbnail/1200x630/6c9df5e3f57f9a7fcf766c8a101fd407/img-2928.jpg?v=fa529222a2be3543711c1a879b51e860":imageurl} alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p class="card-text"><small class="text-body-secondary">{!newsauthor?"unknown":newsauthor} on {new Date(date).toDateString()}</small></p>

    <a href={newsurl}className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
