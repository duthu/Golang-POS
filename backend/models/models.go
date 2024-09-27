package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Db *gorm.DB

type User struct {
	ID       int    `gorm:"primaryKey"`
	Username string `gorm:"unique;not null"`
	IsAdmin  bool
	Password string
}

type Category struct {
	ID          int    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name        string `gorm:"unique;not null;default:null" json:"name" `
	Description string `json:"description"`
	// Slug    string `gorm:"not null;default:null" json:"slug" `
}

type Product struct {
	ID                 int      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name               string   `gorm:"unique;not null;unique;default:null" json:"name"`
	CategoryID         int      `json:"categoryID"`
	ComponentsCategory Category `gorm:"foreignKey:CategoryID;not null;default:null"`
	Description        string   `json:"description"`
	Price              float64  `gorm:"not null;default:null" json:"price"`
	QuantityInStock    int      `gorm:"not null;default:null" json:"quantityInStock"`
}

// sales
type Sale struct {
	ID            int     `gorm:"primaryKey;autoIncrement" json:"id"`
	DateAdded     string  `gorm:"not null;default:null"`
	SubTotal      float64 `gorm:"not null;default:null" json:"subTotal"`
	GrandTotal    float64 `gorm:"not null;default:null" json:"grandTotal"`
	TaxAmount     float64 `gorm:"not null;default:0" json:"taxAmount"`
	TaxPercentage float64 `gorm:"not null;default:0" json:"taxPercentage"`
	AmountPayed   float64 `gorm:"not null;default:null" json:"amountPayed"`
	AmountChange  float64 `gorm:"not null;default:null" json:"amountChange"`
}
type SaleDetail struct {
	ID          int     `gorm:"primaryKey;autoIncrement" json:"id"`
	SaleID      int     `json:"saleID"`
	Sale        Sale    `gorm:"foreignKey:SaleID;not null;default:null"`
	ProductID   int     `json:"productID"`
	Product     Product `gorm:"foreignKey:ProductID;not null;default:null"`
	Price       float64 `gorm:"not null;default:null" json:"price"`
	Quantity    int     `gorm:"not null;default:null" json:"quantity"`
	TotalDetail float64 `gorm:"not null;default:null" json:"totalDetail"`
}

func openDB() {

	database, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic("no db connection")
	}
	println("connected to db")
	Db = database
}

func migrateDB() {
	Db.AutoMigrate(&Category{})
	Db.AutoMigrate(&User{})
	Db.AutoMigrate(&Product{})
	Db.AutoMigrate(&Sale{})
	Db.AutoMigrate(&SaleDetail{})

}

func OpenMigrateDB() {
	openDB()
	migrateDB()

}
