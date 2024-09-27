package register

import (
	"backending/models"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(username *string, password *string) {
	fmt.Printf("username: \"%v\"\n password:  %v \n", string(*username), string(*password))
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	user := models.User{
		Username: *username,
		Password: string(hashedPassword),
		IsAdmin:  true,
	}
	result := models.Db.Create(&user)
	if result.Error != nil {
		fmt.Println("error occurred")
		panic(result.Error.Error())
	}
	fmt.Print("successful creating admin user")
}
