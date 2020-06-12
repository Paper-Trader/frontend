import React from 'react';
import Loader from "react-loader-spinner";

function StockNews({ companyNews }) {
  console.log(companyNews)
  return companyNews.length === 0 ? (
    <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
  ) : (
    <div className="news_container">
      <h2>News</h2>
      <div className="news_feed">
        {companyNews.data.map(data => {
          return <div className="news_card">
            <h3>{data.source_name}</h3>
            <h2>{data.title}</h2>
            <img src={data.image_url} alt={data.news_url}/>
            <p>{data.text}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default StockNews;