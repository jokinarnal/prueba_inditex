import React from "react";
import { Link } from "react-router-dom";

export const PodcastItem = ({...props}) => (
	<div className="pc-list-item">
		<img src={props.podcastInfo['im:image'][2].label} 
			className="pc-list-item-img"
			alt={props.podcastInfo['im:image'][2].label} 
			width="120" 
			height="120" />
		<div className="pc-list-item-cnt box-shadow">
			<h3 className="pd-list-item-name">{props.podcastInfo.title.label}</h3>
			<p className="pd-list-item-author">Author: {props.podcastInfo['im:artist'].label}</p>
		</div>
		<Link to={`/podcast/${props.podcastInfo.id.attributes['im:id']}`} className="pc-list-item-link" />
	</div> )