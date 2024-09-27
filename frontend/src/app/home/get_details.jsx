'use server'

import server_axios from "../../../server_axios"

var categories;
var categories_count;
var products;
var products_count;


var props = {
    avg_month: 20,
    categories: null,
    products: null,
    annual_earnings: 9000,
    monthly_earnings:
      "[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 420.0, 0.0, 0.0, 0.0, 0.0]",
    top_products_names_list: ["Panadol", "Sona Moja", "Mirtraz"],
    top_products_quantity: "[11, 12, 13]",
    top_products_names: "[11, 12, 13]",
  };

async function  getCategories(){
    await server_axios.get(
        "/api/categories"
    ).then( (res) => {
        console.log("success in getting categories")
        
        
        props.categories =  res.data.categories_count
        categories_count = props.categories
        console.log("categories: " + props.categories + " count: " )
    }   
    ).catch((err) => {
        console.log("error in getting categories")
        console.log(err)
    })
}

async function getProducts(){
    console.log("producing")
    await server_axios.get(
        "/api/products", {
            
            withCredentials: true,
        }
    ).then( (res) => {
        console.log("success in getting products")
        
        props.products = res.data.products_count
        products_count = res.data.products_count
        
    }   
    ).catch((err) => {
        console.log("error in getting products")
        console.log(err)
    })
}


// async function increment(){
//     num = 9
//     console.log("num: " + num)
//     props.avg_month = 89
// }


export default async function GetDetails(){
    await getProducts().then(
        console.log(props)
    )
    await getCategories()
    
   

    
    return props
  
}
