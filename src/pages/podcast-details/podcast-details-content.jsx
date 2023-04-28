import React from "react";
import {
	Link,
  useLoaderData,
} from "react-router-dom";

const TableComponent = ({...props}) => {
	console.log(props)
	return (<table className="">
						<thead>
							<tr>
								<th className="">Title</th>
								<th className="">Date</th>
								<th className="">Duration</th>
							</tr>
						</thead>
						<tbody>
							{ props.episodes.length > 0 && props.episodes.map( (episode, index) => {
								return (<tr key={`table-episode-${index}`}>
													<td className="td-title"><Link to={`/podcast/${episode.collectionId}/episode/${episode.trackId}`}>{episode.trackName}</Link></td>
													<td className="td-date">{new Date(episode.releaseDate).toLocaleString().split(',')[0]}</td>
													<td className="td-duration">{Math.floor(episode.trackTimeMillis / 3600000)}:{Math.floor((episode.trackTimeMillis % 3600000) / 60000)}</td>
												</tr>)	
							})}
						</tbody>
						</table>)
}

export const PodcastDetailsContent = ({...props}) => {        
	return(
		<div className="podcast-details-cnt">
			<div className="podcast-episodes-count box-shadow">
				{`Episodes: ${props.resultsCount - 1}`}
			</div>
			<div className="podcast-episodes-list box-shadow">
				<TableComponent episodes={props.episodes} />
			</div>
		</div>
	);
}