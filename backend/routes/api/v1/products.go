package routes

import (
	"backending/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// CRUD for category
func AddCategory(c *gin.Context) {
	var db = models.Db
	var newCategory models.Category
	if err := c.BindJSON(&newCategory); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "failed to bind to json", "errorMsg": err.Error()})
		fmt.Print(err)
		return
	}
	category := models.Category(newCategory)
	result := db.Create(&category)
	if result.Error != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		fmt.Print(result.Error)
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"success": "category created successfuly"})
}

func GetCategories(c *gin.Context) {
	var db = models.Db
	var categories []models.Category
	result := db.Find((&categories))
	fmt.Println(result.Error)
	c.IndentedJSON(http.StatusOK, gin.H{"categories": categories, "categories_count": len(categories)})
}

func GetCategory(c *gin.Context) {
	id := c.Param("id")
	var db = models.Db

	var category models.Category

	result := db.Where("id = ?", id).First(&category)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, category)

}

func UpdateCategory(c *gin.Context) {
	id := c.Param("id")
	var db = models.Db
	var category models.Category
	if err := c.BindJSON(&category); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "failed to bind to json", "errorMsg": err.Error()})
		fmt.Print(err)
		return
	}

	var db_category models.Category
	result := db.Where("id = ?", id).First(&db_category)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	db_category.Description = category.Description
	db_category.Name = category.Name
	db.Save(db_category)
	c.IndentedJSON(http.StatusOK, gin.H{"message": "successfully updated", "category": db_category})
}

func DeleteCategory(c *gin.Context) {
	id := c.Param("id")
	var db = models.Db

	var category models.Category

	result := db.Where("id = ?", id).First(&category)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	} else {
		db.Delete(&category)
	}

	c.IndentedJSON(http.StatusOK, gin.H{"deleted record": &category.Name})

}

// CRUD for products
func AddProduct(c *gin.Context) {
	var db = models.Db
	var newProduct models.Product
	if err := c.BindJSON(&newProduct); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "failed to bind to json", "errorMsg": err.Error()})
		fmt.Print(err)
		return
	}
	categoryID := newProduct.CategoryID
	var category models.Category
	result := db.Where("id = ?", categoryID).First(&category)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "could not find matching category", "errorMsg": result.Error.Error()})
		return
	}

	newProduct.ComponentsCategory = category
	product := models.Product(newProduct)
	resultCreate := db.Create(&product)
	if resultCreate.Error != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"db error": resultCreate.Error.Error()})
		fmt.Print(resultCreate.Error)
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"success": "product created successfuly"})
}

func GetProducts(c *gin.Context) {
	var db = models.Db
	var products []models.Product
	// result := db.Find((&products))
	result := db.Preload("ComponentsCategory").Find(&products)
	fmt.Println(result.Error)
	c.IndentedJSON(http.StatusOK, gin.H{"products": products, "products_count": len(products)})
}

func GetProduct(c *gin.Context) {
	id := c.Param("id")
	var db = models.Db

	var product models.Product

	result := db.Where("id = ?", id).Preload("ComponentsCategory").First(&product)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"product": product})

}

func UpdateProduct(c *gin.Context) {
	id := c.Param("id")
	var db = models.Db
	var product models.Product
	if err := c.BindJSON(&product); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "failed to bind to json", "errorMsg": err.Error()})
		fmt.Print(err)
		return
	}

	var db_product models.Product
	result := db.Where("id = ?", id).First(&db_product)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	db_product.Description = product.Description
	db_product.Name = product.Name
	db_product.Price = product.Price
	db_product.QuantityInStock = product.QuantityInStock
	db_product.CategoryID = product.CategoryID

	db.Save(db_product)
	c.IndentedJSON(http.StatusOK, gin.H{"message": "successfully updated", "product": db_product})
}

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	var db = models.Db

	var product models.Product

	result := db.Where("id = ?", id).First(&product)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	} else {
		db.Delete(&product)
	}

	c.IndentedJSON(http.StatusOK, gin.H{"deleted record": &product.Name})

}

func SearchProduct(c *gin.Context) {
	search_name, isFound := c.GetQuery("product_name")
	if !isFound {
		fmt.Println("error occurred. name not in parameter of get request")
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Bad request. missing name parameter"})
		return
	}
	search_product := "%" + search_name + "%"

	var db = models.Db
	var products []models.Product
	result := db.Where("name LIKE ?", search_product).Preload("ComponentsCategory").Find(&products)
	if result.Error != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"products": products, "products_count": len(products)})

}
