import { useEffect, useState } from "react";
import api_axios from "../../../../api_axios";
import { useRouter } from "next/navigation";
function changeSelect(categories) {
  const selectBox = document.getElementById("categorySelect");
  selectBox.innerHTML = "";
  selectBox.innerHTML +=
    "<option disabled selected value> -- select a category -- </option>";
  for (var i = 0; i < categories.length; i++) {
    var opt = document.createElement("option");
    opt.value = categories[i].id;
    opt.innerHTML = categories[i].name;
    selectBox.appendChild(opt);
  }
}


function AddProduct() { 

  const router = useRouter()
  
  //useState hooks to store product info
  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState(0)
  const [productPrice, setProductPrice] = useState(0)
  const [productDescription, setProductDescription] = useState("")
  const [quantityInStock, setQuantityInStock] = useState(0)




  //get the categories from backend and add to select input
  useEffect(() => {
    api_axios
      .get("/api/categories", {
        withCredentials: true,
        
      })
      .then((res) => {
        console.log(res.data.categories);

        var categories = res.data.categories;
        changeSelect(categories);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);


  //handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    var jsonData = {
      "name": productName,
      "categoryID": parseInt(productCategory),
      "description": productDescription,
      "quantityInStock": parseInt(quantityInStock),
      "price": parseFloat(productPrice)

    }
    api_axios.post("/api/addProduct", jsonData, {
      withCredentials: true
    }).then((res) => {
        router.push("/products")
    }).catch((err) => {
      console.log("error occurred")
      console.log(err)
    })
  }

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Add Product</h1>
      </div>

      <div className="row ml-0 mb-3">
        <a href="{% url 'products_list' %}">
          <button type="button" className="btn btn-info font-weight-bold">
            <i className="fas fa-long-arrow-alt-left mr-2"></i>
            Go back
          </button>
        </a>
      </div>

      <div className="row">
        <div className="card col-md-8">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <b>Name</b>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={e => setProductName(e.target.value)}
                    required
                    className="form-control"
                  ></input>
                </div>
               
              </div>

              <div className="form-row">
                <div className="form-group col-md-8">
                  <b>Category</b>
                  <select name="category"  
                  onChange={e => setProductCategory(e.target.value)}

                  id="categorySelect" className="form-control">
                    
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-8">
                  <b>Price</b>
                  <input
                    type="number"
                    name="price"
                    required
                    onChange={e => setProductPrice(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group col-md-4">
                  <b>Quantity in Stock</b>
                  <input
                    type="number"
                    name="quantityInStock"
                    required
                    className="form-control"
                    onChange={e => setQuantityInStock(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <b>Description</b>
                  <textarea
                    name="description"
                    cols={40}
                    rows={10}
                    maxLength={256}
                    className="form-control"
                    onChange={e => setProductDescription(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success font-weight-bold">
                Create product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
