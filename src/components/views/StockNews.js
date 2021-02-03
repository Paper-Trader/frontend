import React from 'react';
import Loader from "react-loader-spinner";
import moment from 'moment';

function StockNews({ companyNews }) {
  return companyNews.length === 0 ? (
    <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
  ) : (
    <div className="news_container">
      <h2 className="news_header" >News</h2>
      {companyNews.data.map((data, id) => {
        return <a href={data.news_url} className="news_card" key={id}>
          <h3 className="news_source">{data.source_name}</h3>
          <h3 className="news_time">{moment(data.date).fromNow()}</h3>
          <div className="news_content">
            <div className="news_body_text">
              <h2 className="news_title">{data.title}</h2>
              <p className="news_text">{data.text}</p>
            </div>
            <img src={data.image_url} alt={data.news_url} />
          </div>
        </a>
      })}
    </div>
  )
}

export default StockNews;