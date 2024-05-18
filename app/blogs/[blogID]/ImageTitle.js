import React from "react";

function ImageTitle({ tag, date, author, title, image }) {
  return (
    <div className="single-post-wrap style-overlay">
      <div className="thumb">
        <img src={image} alt="img" />
      </div>
      <div className="details pb-4">
        <div className="post-meta-single mb-2">
          <ul>
            <li>
              <a className="tag-base tag-blue" href="#">
                {tag}
              </a>
            </li>
            <li>
              <p>
                <i className="fa fa-clock-o" />
                {date}
              </p>
            </li>
            <li>
              <i className="fa fa-user" />
              {author}
            </li>
          </ul>
        </div>
        <h5 className="title mt-0">{title}</h5>
      </div>
    </div>
  );
}

export default ImageTitle;
