package controllers

import (
	"github.com/revel/revel"
	"rozklad_cdtu/app/libs/database"
	"rozklad_cdtu/app/models"
)

type Schedule struct {
	Admin
}

func (c Schedule) GetFaculties() revel.Result {
	faculties, err := database.FacultiesList(c.DB)
	if err != nil {
		return jsonError(400, err)
	}
	return c.RenderJson(faculties)
}

func (c Schedule) GetDaysPairsList() revel.Result {
	var list struct {
		Days  *[]models.Days
		Pairs *[]models.Pairs
	}
	list.Days = &models.DaysList
	list.Pairs = &models.PairsList

	return c.RenderJson(list)
}

func (c Schedule) GetFacultyGroups(facultyId int64, year int) revel.Result {
	groups, err := database.FacultyGroupsList(c.DB, facultyId, year)
	if err != nil {
		return jsonError(400, err)
	}
	return c.RenderJson(groups)
}

func (c Schedule) GetFacultySchedule(facultyId int64, year int) revel.Result {
	schedule := database.FacultySchedule(c.DB, facultyId, year)
	return c.RenderJson(schedule)
}

func (c Schedule) GetFacultyTasks(facultyId int64, year int) revel.Result {
	tasks := database.FacultyTasks(c.DB, facultyId, year)
	return c.RenderJson(tasks)
}
