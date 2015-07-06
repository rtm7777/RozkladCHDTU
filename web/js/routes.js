import React from "react";
import { Route } from "react-router";

import DataBase from "./pages/database";
import Tasks from "./pages/tasks";

export default (
	<Route name='admin' path='/admin/'>
		<Route name='database' path='database/?' handler={DataBase}/>
		<Route name='tasks' path='tasks/?' handler={Tasks}/>
	</Route>
);