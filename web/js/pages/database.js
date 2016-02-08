/** @jsx */
import React from "react";
import Dispatcher from "../dispatcher/dispatcher";
import DBActions from "../actions/dbActions";
import DBStore from "../stores/dbStore";
import clickAway from "../libs/clickAwayUtils";

import Loader from "../components/database/dbLoader";
import ActionMenu from "../components/database/dbActionMenu";
import Content from "../components/database/dbContent";
import DBNavigation from "../components/database/dbNavigation";

class DataBase extends React.Component {
	static childContextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(DBStore).isRequired
	};

	constructor(props) {
		super(props);
		const dispatcher = Dispatcher;

		this.state = DBStore.defaultState;
		this.actions = new DBActions(dispatcher);
		this.store = new DBStore(dispatcher, this.state);

		this.store.on('load', () => {
			let state = this.store.getState();
			this.setState(state);
		});

		this.actions.load();
		document.addEventListener('mousedown', clickAway.checkClickAway);
	}

	getChildContext() {
		return {
			actions: this.actions,
			store: this.store
		};
	}

	componentWillUnmount() {
		this.store.removeListener('load');
		document.removeEventListener('mousedown', clickAway.checkClickAway);
	}

	render() {
		let actionMenuProps = {
			filters: this.state.filters
		};
		let navProps = {
			navList: this.state.categoryList,
			selectedOption: this.state.selectedCategory
		};
		let contentProps = {
			fields: this.state.fields,
			columns: this.state.columns,
			selectedCategory: this.state.selectedCategory,
			filters: this.state.filters
		};

		return (
			<div>
				<ActionMenu {...actionMenuProps} />
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3'>
							<div id='db_navigation' className='panel panel-default'>
								<div className='panel-heading'>Categories:</div>
								<Loader/>
								<DBNavigation {...navProps} />
							</div>
						</div>
						<div id='work_space' className='col-lg-9'>
							<Loader/>
							<Content {...contentProps} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DataBase;
