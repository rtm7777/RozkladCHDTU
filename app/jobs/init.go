package jobs

import (
	_ "github.com/revel/revel"
	_ "github.com/revel/revel/modules/jobs/app/jobs"
)

func init() {
	// revel.OnAppStart(func() { jobs.Now(AudiencesImport{}) })
	// revel.OnAppStart(func() { jobs.Now(SubjectsImport{}) })
	// revel.OnAppStart(func() { jobs.Now(GroupsImport{}) })
}
