package routes

import (
	"backending/middleware"
	routes "backending/routes/api/v1"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func InitRouter() *gin.Engine {

	router := gin.New()
	router.LoadHTMLGlob(("templates/*/*.html"))
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(CORSMiddleware())
	router.Static("/css", "./static/css")
	router.Static("/js", "./static/js")
	router.Static("/vendor", "./static/vendor")

	/*


	 */
	api := router.Group("/api")
	{

		api.POST("/addCategory", middleware.ValidateJWT, routes.AddCategory)
		api.GET("/categories", middleware.ValidateJWT, routes.GetCategories)
		api.GET("/categories/:id", middleware.ValidateJWT, routes.GetCategory)
		api.PATCH("/categories/update/:id", middleware.ValidateJWT, routes.UpdateCategory)
		api.DELETE("/categories/delete/:id", routes.DeleteCategory)

		api.POST("/addProduct", middleware.ValidateJWT, routes.AddProduct)
		api.GET("/products", middleware.ValidateJWT, routes.GetProducts)
		api.GET("/products/:id", middleware.ValidateJWT, routes.GetProduct)
		api.GET("/products/search", middleware.ValidateJWT, routes.SearchProduct) //search for product when adding a sale
		api.PATCH("/products/update/:id", middleware.ValidateJWT, routes.UpdateProduct)
		api.DELETE("/products/delete/:id", routes.DeleteProduct)

		api.POST("/addSale", middleware.ValidateJWT, routes.AddSale)
		api.GET("/sales", middleware.ValidateJWT, routes.GetSales)
		api.GET("/sales/:id", middleware.ValidateJWT, routes.GetSale)

		api.GET("/dashboard", middleware.ValidateJWT, routes.Dashboard)

	}

	displayViews := router.Group("")
	{
		displayViews.GET("", middleware.ValidateJWTRedirect, routes.HomePage)
		displayViews.GET("/login", routes.LoginPage)
		displayViews.POST("/login", routes.HandleLogin)
		displayViews.GET("/validateCreds", middleware.ValidateJWT)
	}

	return router
}
