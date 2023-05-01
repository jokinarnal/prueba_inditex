import React from "react";
import { Link } from "react-router-dom";

export const PodcastEpisodesTable = ({...props}) => 
	(<table className="">
		<thead>
				<tr>
						<th className="">Title</th>
						<th className="">Date</th>
						<th className="th-duration">Duration</th>
				</tr>
		</thead>
		<tbody>
				{ props.episodes.length > 0 && props.episodes.map( (episode, index) => {
					
					const durationHours = Math.floor(episode.trackTimeMillis / 3600000);
					const durationHoursStr =  durationHours < 10 ? `0${durationHours}` : `${durationHours}`;
					
					const durationMins = Math.floor((episode.trackTimeMillis % 3600000) / 60000);
					const durationMinsStr = durationMins < 10 ? `0${durationMins}` : `${durationMins}`;

					return (<tr key={`table-episode-${index}`}>
										<td className="td-title">
											<Link className="dt-link" to={`/podcast/${episode.collectionId}/episode/${episode.trackId}`}>{episode.trackName}</Link>
										</td>
										<td className="td-date">{new Date(episode.releaseDate).toLocaleString().split(',')[0]}</td>
										<td className="td-duration">{durationHoursStr}:{durationMinsStr}</td>
									</tr>)	
				})}
		</tbody>
		</table>)
