import storage from "../services/localStorage";
import promise from "../libs/promise";
import dbDispatcher from "../dispatcher/dbDispatcher";
import {EventEmitter} from "events";

class DBStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = DBStore.defaultState;
		this.loader = true;
		this.selectedItems = [];

		dispatcher.register((action) => {
			switch(action.actionType) {
				case 'load':
					this.load().then(() => {
						this.emit('load');
						this.emit('loaderChange');
					});
					break;
				case 'categorySelected':
					this.changeCategory(action);
					break;
				case 'itemSelected':
					this.itemSelected(action);
					break;
				case 'deleteAction':
					this.deleteItems();
					break;
				case 'addAction':
					this.addItem();
					break;
				}
		});
	}

	load() {
		let promises = [promise.post('/get_category_list')];
		if (this.state.selectedCategory) {
			promises.push(this.loadFields(this.state.selectedCategory));
		}
		return Promise.all(promises).then((data) => {
			this.state.categoryList = data[0];
			this.loader = false;
		}).catch(() => {
			console.log("loading error");
		});
	}

	changeCategory(action) {
		this.loader = true;
		this.emit('loaderChange');

		this.selectedItems = [];
		this.actionMenuChange();

		this.state.filters = [];
		this.state.fields = [];

		let category = action.name;
		storage.saveValue("category", category);
		this.state.selectedCategory = category;
		this.emit('load');
		this.loadFields(category).then(data => {
			this.emit('load');

			this.loader = false;
			this.emit('loaderChange');
		});
	}

	loadFields(category) {
		return promise.post('/get_category', {category: category}).then((data) => {
			this.state.fields = data.items || [];
			this.state.columns = data.columns;
			this.state.filters = data.filters || [];
		});
	}

	itemSelected(item) {
		let selectedItems = this.selectedItems;
		if (item.selected) {
			selectedItems.push(item.id);
		} else {
			let i;
			if ((i = selectedItems.indexOf(item.id)) > -1) {
				selectedItems.splice(i, 1);
			}
		}
		this.actionMenuChange();
	}

	deleteItems() {
		console.log("items deleted");
	}

	addItem() {
		this.state.fields.push({});
		this.emit('load');
		console.log("adding new item");
	}

	actionMenuChange() {
		console.log(this.selectedItems);
		this.emit('itemSelected');
	}

	getState() {
		return this.state;
	}

	getLoaderState() {
		return this.loader;
	}

	getSelectedItems() {
		return this.selectedItems;
	}
}

DBStore.defaultState = {
	categoryList: [],
	selectedCategory: storage.getValue("category") || "",
	fields: [],
	columns: [],
	filters: [],
	error_message: ""
};

export default DBStore;
