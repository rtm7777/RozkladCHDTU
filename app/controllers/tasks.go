package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
)

type Tasks struct {
	Admin
}

func (c Tasks) GetFacultyDepartmentsList() revel.Result {
	result, err := database.FacultiesDepartments(c.DB)
	if err != nil {
		return jsonError(400, err)
	} else {
		return c.RenderJson(result)
	}
}