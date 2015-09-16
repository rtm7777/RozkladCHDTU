import storage from "../services/localStorage";
import promise from "../libs/promise";
import DataBase from "../services/indexedDB";
import {EventEmitter} from "events";

class TasksStore extends EventEmitter {
	constructor(dispatcher) {
		super();
		this.state = TasksStore.defaultState;
		this.loader = true;
		this.db = new DataBase();

		dispatcher.register((action) => {
			switch(action.actionType) {
				case 'load':
					this.load().then(() => {
						this.emit('load');
						this.emit('loaderChange');
					});
					break;
				case 'departmentSelected':
					this.departmentSelected(action);
					break;
				case 'itemChanged':
					this.itemChanged(action);
					break;
				case 'facultyChanged':
					this.facultyChanged(action);
					break;
				case 'loadTasks':
					this.loadTasks();
					break;
				}
		});
	}

	load() {
		let promises = [
			promise.get('/get_faculty_departments_list'),
		];
		if (this.state.selectedFaculty && this.state.selectedDepartment) {
			promises.push(this.loadTasks(this.state.selectedDepartment));
		}

		this.db.synchronizeAll();

		return Promise.all(promises).then((data) => {
			this.state.facultiesDepartments = data[0];
			this.loader = false;
		}).catch(() => {
			console.log('loading error');
		});
	}

	facultyChanged(action) {
		this.state.selectedFaculty = action.facultyId;
		storage.saveValue('selectedFaculty', action.facultyId);
		this.state.selectedDepartment = '';
		storage.saveValue('selectedDepartment', '');
		this.emit('load');
	}

	departmentSelected(action) {
		this.loader = true;
		this.emit('loaderChange');

		this.state.fields = [];

		let department = action.departmentId;
		storage.saveValue('selectedDepartment', department);
		this.state.selectedDepartment = department;
		this.emit('load');
		this.loadTasks(action.departmentId).then(() => {
			this.emit('load');

			this.loader = false;
			this.emit('loaderChange');
		});
	}

	loadTasks(departmentId) {
		return promise.get('/get_tasks', {departmentId}).then((data) => {
			this.state.fields = data.items || [];
			this.state.columns = data.columns || [];
		});
	}

	itemChanged(item) {
		console.log(item);
	}

	getState() {
		return this.state;
	}

	getLoaderState() {
		return this.loader;
	}

}

TasksStore.defaultState = {
	facultiesDepartments: [{'facultyId': 0, 'facultyName': "---", "departments": []}],
	selectedFaculty: storage.getValue('selectedFaculty') || '',
	selectedDepartment: storage.getValue('selectedDepartment') || '',
	fields: [],
	columns: []
};

export default TasksStore;
