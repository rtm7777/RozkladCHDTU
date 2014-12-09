package tests

import (
	"bitbucket.org/tebeka/selenium"
	_ "fmt"
	"github.com/revel/revel"
)

type InterfaceTest struct {
	revel.TestSuite
}

func (t *InterfaceTest) TestMain() {
	caps := selenium.Capabilities{"browserName": "firefox"}
	wd, _ := selenium.NewRemote(caps, "")
	defer wd.Quit()

	wd.Get("http://localhost:9000")

}