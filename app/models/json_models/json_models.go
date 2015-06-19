package json_models

type Pair struct {
	Id       int64  `json:"id"`
	Num      string `json:"num"`
	Subject1 string `json:"subject1"`
	Subject2 string `json:"subject2"`
	Type     int    `json:"type"`
}

type Day struct {
	Id   int64  `json:"id"`
	Day  string `json:"day"`
	Pair []Pair `json:"pair"`
}

type Schedule struct {
	Id      string `json:"id"`
	Type    string `json:"type"`
	Subject string `json:"subject"`
}

type Task struct {
	Id       string `json:"id"`
	Subject  string `json:"subject"`
	Type     string `json:"type"`
	Progress string `json:"progress"`
}

type FilterValue struct {
	Id    int64  `json:"id"`
	Value string `json:"value"`
}

type Filter struct {
	Name   string        `json:"name"`
	Values []FilterValue `json:"values"`
}

type DBItems struct {
	Items   interface{} `json:"items"`
	Filters []Filter    `json:"filters"`
	Columns []string    `json:"columns"`
}

type Department struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

type FacultiesDepartments struct {
	FacultyId   int64        `json:"facultyId"`
	FacultyName string       `json:"facultyName"`
	Departments []Department `json:"departments,interface"`
}
