package routes

import (
	"backending/models"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type productStruct struct {
	Product      models.Product `json:"product"`
	Quantity     int            `json:"quantity"`
	TotalProduct float64        `json:"total_product"`
	Price        float64        `json:"price"`
}

type saleDetailStruct struct {
	SubTotal      float64         `json:"sub_total"`
	GrandTotal    float64         `json:"grand_total"`
	AmountPayed   float64         `json:"amount_payed"`
	AmountChange  float64         `json:"amount_change"`
	TaxPercentage float64         `json:"tax_percentage"`
	TaxAmount     float64         `json:"tax_amount"`
	Products      []productStruct `json:"products"`
}

func AddSale(c *gin.Context) {

	//first get the sale details into the saleDetailStruct
	var newSaleDetailStruct saleDetailStruct
	if err := c.BindJSON(&newSaleDetailStruct); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "failed to bind to json", "errorMsg": err.Error()})
		fmt.Print(err)
		return
	}
	// fmt.Printf("\n %+v \n", newSaleDetailStruct)

	//create a new models.Sale and save
	var db = models.Db

	var newSale = models.Sale{
		DateAdded:     time.Now().Format(time.RFC1123), //get the current date and time
		SubTotal:      newSaleDetailStruct.SubTotal,
		GrandTotal:    newSaleDetailStruct.GrandTotal,
		TaxAmount:     newSaleDetailStruct.TaxAmount,
		TaxPercentage: newSaleDetailStruct.TaxPercentage,
		AmountPayed:   newSaleDetailStruct.AmountPayed,
		AmountChange:  newSaleDetailStruct.AmountChange,
	}
	result := db.Create(&newSale)
	if result.Error != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		fmt.Print(result.Error)
		return
	}

	//for each product in saleDetailStruct, create a new models.SaleDetail and save
	for _, productStruct := range newSaleDetailStruct.Products {
		//product := productStruct.Product
		var product models.Product

		result_product := db.Where("id = ?", productStruct.Product.ID).Preload("ComponentsCategory").First(&product)
		if result_product.Error != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": result_product.Error.Error()})
			return
		}
		product.QuantityInStock = product.QuantityInStock - productStruct.Quantity
		db.Save(&product)
		var saleDetail = models.SaleDetail{
			Sale:        newSale,
			Product:     product,
			Price:       productStruct.Product.Price,
			Quantity:    productStruct.Quantity,
			TotalDetail: productStruct.TotalProduct,
		}

		fmt.Printf("\n %+v \n", product)
		//fmt.Println(saleDetail)
		fmt.Printf("\n %+v \n", saleDetail)

		result := db.Create(&saleDetail)
		if result.Error != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			fmt.Print(result.Error)
			return
		}

	}
	c.IndentedJSON(http.StatusCreated, gin.H{"success": "successfuly"})
}

func GetSales(c *gin.Context) {
	type SaleObject struct {
		SaleParent models.Sale
		Items      int `json:"items"`
	}

	var SaleObjects []SaleObject
	var db = models.Db
	var sales []models.Sale

	result := db.Find((&sales))
	fmt.Println(result.Error)

	for _, sale := range sales {

		var sale_details []models.SaleDetail
		var items int = 0
		result := db.Where(&models.SaleDetail{SaleID: sale.ID}).Find(&sale_details)
		if result.Error != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "could not find matching category", "errorMsg": result.Error.Error()})
			return
		}
		for _, detail := range sale_details {
			items += detail.Quantity
		}
		saleObject := SaleObject{
			SaleParent: sale,
			Items:      items,
		}
		SaleObjects = append(SaleObjects, saleObject)
	}

	c.IndentedJSON(http.StatusOK, gin.H{"sales": SaleObjects, "sales_count": len(SaleObjects)})
}

func GetSale(c *gin.Context) {

	id := c.Param("id")
	var db = models.Db

	var sale models.Sale

	result := db.Where("id = ?", id).First(&sale)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	var sale_details []models.SaleDetail
	result_details := db.Where(&models.SaleDetail{SaleID: sale.ID}).Preload("Product").Find(&sale_details)
	if result_details.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "could not find matching category", "errorMsg": result.Error.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"sale": sale, "details": sale_details})

}
