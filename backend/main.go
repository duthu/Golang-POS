package main

import (
	register "backending/accounts"
	"backending/models"
	"backending/routes"
	"flag"
)

func main() {
	models.OpenMigrateDB()
	username := flag.String("username", "", "")
	password := flag.String("password", "", "")
	flag.Parse()
	if *username != "" && *password != "" {
		register.CreateUser(username, password)
	} else {
		app := routes.InitRouter()
		app.Run(":9090")
	}

}
