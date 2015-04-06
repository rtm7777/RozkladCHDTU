package models

import (
	"github.com/jinzhu/gorm"
)

type Schedule struct {
	Id          int64     `json:"id"`
	GroupId     int64     `json:"groupId"`
	Group       Groups    `json:"group"`
	TeacherId   int64     `json:"teacherId"`
	Teacher     Teachers  `json:"teacher"`
	AudienceId  int64     `json:"audienceId"`
	Audience    Audiences `json:"audience"`
	SubjectId   int64     `json:"subjectId"`
	Subject     Subjects  `json:"subject"`
	DayId       int64     `json:"dayId"`
	Day         Days      `json:"day"`
	PairId      int64     `json:"pairId"`
	Pair        Pairs     `json:"pair"`
	PairType    string    `sql:"size:25" json:"pairType"`
	PairPeriod  int       `json:"pairPeriod"`
	SubjectType string    `sql:"size:25" json:"subjectType"`
}

func (schedule *Schedule) LoadRelated(db *gorm.DB) *Schedule {
	db.Model(schedule).Related(&schedule.Teacher, "TeacherId")
	db.Model(schedule).Related(&schedule.Audience, "AudienceId").Related(&schedule.Audience.Housing, "HousingId")
	db.Model(schedule).Related(&schedule.Subject, "SubjectId")
	return schedule
}

func (schedule *Schedule) LoadRelatedTeacher(db *gorm.DB) *Schedule {
	db.Model(schedule).Related(&schedule.Group, "GroupId")
	db.Model(schedule).Related(&schedule.Audience, "AudienceId").Related(&schedule.Audience.Housing, "HousingId")
	db.Model(schedule).Related(&schedule.Subject, "SubjectId")
	return schedule
}
