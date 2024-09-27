package routes

import (
	"backending/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Dashboard(c *gin.Context) {
	//get top products
	var db = models.Db
	// var TopProducts []models.Product
	var saleDetails []models.SaleDetail
	result := db.Preload("Product").Order("product_id").Find(&saleDetails)
	if result.Error != nil {
		fmt.Println("error occurred")
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, saleDetails)
	// for _, saleDetail := range saleDetails {

	// }

}
