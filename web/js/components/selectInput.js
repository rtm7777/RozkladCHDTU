/** @jsx */
import React from "react";

class SelectInput extends React.Component {
	constructor(props) {
		super(props);
		this.inputValue = '';
		this.searchValue = '';
		this.stateObj = {
			opened: false,
			fields: []
		};
		this.state = {
			opened: false,
			fields: []
		};
	}

	search = (value) => {
		this.props.searchFunc(value).then((result) => {
			this.stateObj.fields = result;
			this.updateState();
		});
	}

	onInputChanged = (e) => {
		this.search(e.target.value);
	}

	optionSelected = (e) => {
		this.closeSelect();
		if (this.props.onChange) {
			this.props.onChange({
				name: this.props.name,
				value: e.target.dataset.value
			});
		}
		if (this.state.opened) {
		};
	}

	openSelect = () => {
		if (!this.state.opened) {
			if (this.props.elementConatainer) this.props.elementConatainer.element = this;
			this.inputValue = this.refs.input.value;
			this.refs.input.value = '';
			this.stateObj.opened = true;
			this.updateState();
			this.search('');
		}
	}

	closeSelect = () => {
		this.stateObj.opened = false;
		this.updateState();
		if (this.props.elementConatainer) {
			this.props.elementConatainer.element = null;
		}
	}

	componentClickAway = () => {
		if (this.state.opened) {
			this.refs.input.value = this.inputValue;
			this.closeSelect();
		};
	}

	updateState() {
		this.setState(this.stateObj);
	}

	render() {
		let style = {
			display: this.state.opened ? 'block' : 'none'
		};
		let options = this.state.fields.map(({id, value}) => {
			return (
				<li key={id} onClick={this.optionSelected} data-value={id}>{value}</li>
			);
		});
		let inputProps = {
			ref: 'input',
			className: 'table-input',
			defaultValue: this.props.value,
			name: this.props.name,
			onMouseDown: this.openSelect,
			onChange: this.onInputChanged,
			type: 'text'
		};
		return (
			<div className={'input-select'}>
				<input {...inputProps} />
				<ul className='dropdown-menu' style={style}>
					{options}
				</ul>
			</div>
		);
	}
}

export default SelectInput;
