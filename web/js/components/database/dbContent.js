/** @jsx */
import React from "react";
import PropTypes from 'prop-types';
import AudienceItem from "./items/audienceItem";
import DepartmentItem from "./items/departmentItem";
import FacultyItem from "./items/facultyItem";
import GroupItem from "./items/groupItem";
import HousingItem from "./items/housingItem";
import SubjectItem from "./items/subjectItem";
import TeacherItem from "./items/teacherItem";
import DBStore from "../../stores/dbStore";
import I18n from "../../services/i18n";

class Content extends React.Component {
	static contextTypes = {
		actions: PropTypes.object.isRequired,
		store: PropTypes.instanceOf(DBStore).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {loader: true};
	}

	componentWillMount() {
		let store = this.context.store;
		store.on('loaderChange', () => {
			this.setState({loader: store.getLoaderState()});
		});
	}

	componentWillUnmount() {
		this.context.store.removeListener('loaderChange');
	}

	itemByType(type, props) {
		let items = {
			audiences:   () => <AudienceItem {...props} />,
			departments: () => <DepartmentItem {...props} />,
			faculties:   () => <FacultyItem {...props} />,
			groups:      () => <GroupItem {...props} />,
			housings:    () => <HousingItem {...props} />,
			subjects:    () => <SubjectItem {...props} />,
			teachers:    () => <TeacherItem {...props} />
		};

		return items[type]();
	}

	render() {
		let headerCols = this.props.columns.map((column, i) => {
			return (
				<th key={i}>
					{I18n.t(column)}
				</th>
			);
		});

		let items = [];
		if (this.props.fields) {
			items = this.props.fields.map(field => {
				let props = {
					category: this.props.selectedCategory,
					filters: this.props.filters,
					data: field,
					key: field.id
				};

				return this.itemByType(this.props.selectedCategory, props);
			});
		}

		let tableShow = 'invisible';
		if (!this.state.loader) {
			tableShow = 'visible';
		}

		return (
			<table className={`table table-bordered table-hover table-striped table-condensed ${tableShow}`}>
				<thead>
					<tr>
						{headerCols}
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</table>
		);
	}
}

export default Content;
