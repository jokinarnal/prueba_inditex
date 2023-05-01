import React, { useState, useEffect } from "react";
import {
  useLoaderData,
} from "react-router-dom";

import { Filter } from "./filter.jsx";
import { PodcastItem } from "./podcast-item.jsx";

const setPodcastFilteredList = (listData, filter, setPodcastFilterListData) => {

  const lowerCaseFilter = filter.toLowerCase();

  let filteredList = filter.length > 0 ? 
    listData.filter( podcastItem  => podcastItem['im:artist'].label.toLowerCase().includes(lowerCaseFilter) || podcastItem.title.label.toLowerCase().includes(lowerCaseFilter) ) :
    listData;
  setPodcastFilterListData(filteredList); 
  return;

} 

export function Component(props) {
 
  const data = useLoaderData();
    
  const [ podcastFilterListData, setPodcastFilterListData ] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect( () => {
    if ( data.hasOwnProperty('feed') ) {
      setPodcastFilteredList(data.feed.entry, filter, setPodcastFilterListData);
    }
  }, [filter]);

  const handleFilterChange = e => {
    const text = e.target.value;
    setFilter(text);
    return;
  }

  return (
    <div className="podcast-list-container">
      <Filter listLength={podcastFilterListData.length} filterText={filter} handleFilterChange={handleFilterChange} />
      { podcastFilterListData.length > 0 && 
        <div className="podcast-list-content">
          { podcastFilterListData.map( (podcastItem, index) => <PodcastItem podcastInfo={podcastItem} key={`pc-item-${index}`} />) }
        </div> }      
    </div>
  );
}
