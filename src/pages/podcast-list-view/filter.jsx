import React from "react";

export const Filter = ({...props}) => (
	<div className="pc-list-filter-wrap">
		<span className="pc-list-filter-count">{props.listLength}</span>
		<form>
			<input type="text" placeholder="Filter Podcast..." value={props.Text} onChange={props.handleFilterChange} />
		</form>
	</div> );
