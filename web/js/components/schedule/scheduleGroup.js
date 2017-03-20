/** @jsx */
import React from "react";
import ScheduleStore from "../../stores/scheduleStore";

import DaysPairsRows from "./scheduleDaysPairsRows";
import ScheduleCell from "./scheduleCell";
import ToggleButton from "../toggleButton";

class Group extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(ScheduleStore).isRequired
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	render() {

		return (
			<div className='group-container'>
				<div className='group-header'>
					<ToggleButton/>
					{this.props.groupName}
				</div>

			</div>
		);
	}
}

export default Group;
