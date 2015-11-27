/** @jsx */
import React from "react";
import Select from "../select";
import ActionMenuButton from "./actionMenuButton";
import DBStore from "../../stores/dbStore";

class ActionMenu extends React.Component {
	static contextTypes = {
		actions: React.PropTypes.object.isRequired,
		store: React.PropTypes.instanceOf(DBStore).isRequired
	}

	constructor(props) {
		super(props);
		this.actionButtons = {
			delete: {
				action: 'delete',
				name: 'Delete',
				hidden: true,
				icon: 'remove'
			},
			add: {
				action: 'add',
				name: 'Add',
				hidden: false,
				icon: 'plus'
			}
		};
		this.state = {
			actions: this.actionButtons
		};
	}

	componentWillMount() {
		let store = this.context.store;
		store.on('itemSelected', () => {
			if (store.getSelectedItems().length) {
				this.actionButtons.delete.hidden = false;
			} else {
				this.actionButtons.delete.hidden = true;
			}
			this.setState({actions: this.actionButtons});
		});
	}

	componentWillUnmount() {
		this.context.store.removeListener('itemSelected');
	}

	actionButtonsActions = (child) => {
		let actions = {
			delete: () => this.context.actions.deleteAction(),
			add: () => this.context.actions.addAction()
		};

		return actions[child.props.data.action]();
	}

	render() {
		let filters = this.props.filters.map((filter, i) => {
			let props = {
				values: filter.values,
				key: i,
				name: filter.name,
				label: true
			};

			return <Select {...props} />;
		});

		let actions = [];
		let i = 0;
		for (let key of Object.keys(this.state.actions)) {
			let props = {
				onClick: this.actionButtonsActions,
				key: i,
				data: this.state.actions[key]
			};

			actions.push(<ActionMenuButton {...props} />);
			i++;
		}

		return (
			<div className='actions-bar container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='panel clearfix panel-default'>
							<ul className='nav nav-pills pull-left filter-menu'>
								{filters}
							</ul>
							<ul className='nav nav-pills pull-right action-menu'>
								{actions}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ActionMenu;
