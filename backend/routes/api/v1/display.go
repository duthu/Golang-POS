package routes

import (
	"backending/models"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func LoginPage(c *gin.Context) {
	c.HTML(200, "login.html", nil)
}

// generates the JWT token
func generateToken(user models.User) (string, error) {
	username := user.Username
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"id":       user.ID,
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return "error", err
	}
	return tokenString, nil
}

func HandleLogin(c *gin.Context) {
	//get form data
	username := c.PostForm("username")
	password := c.PostForm("password")

	//find user with given username in database
	var user models.User

	result := models.Db.Where("username = ?", username).First(&user)
	if result.Error != nil {

		c.JSON(http.StatusNotFound, gin.H{"error": "User does not exist"})
		return
	}

	//check the password if it's correct
	passwordHash := user.Password
	err := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password))
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Wrong password"})
		return
	}

	//if password correct; generate the JWT token
	JWTTokenString, err := generateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	//set the JWT token in cookie
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", JWTTokenString, 3600*24*30, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"token": JWTTokenString})
	//c.Redirect(http.StatusFound, "/")
}

func HomePage(c *gin.Context) {
	c.HTML(200, "pos_index.html", gin.H{
		"title": "Welcome",
	})
}
