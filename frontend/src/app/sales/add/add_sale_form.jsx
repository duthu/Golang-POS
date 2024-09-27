"use client";

import { useEffect,  useState } from "react";
import api_axios from "../../../../api_axios";

// import create_table from './create_table'
import {sale} from './create_table'
import {registerEvents} from './sale_events'
import { useRouter } from "next/navigation";

 
var number = 1;


function changeSelect(products) {
  const selectBox = document.getElementById("searchbox_products");
  selectBox.innerHTML = "";
  selectBox.innerHTML +=
    "<option disabled selected value> -- select a product -- </option>";
  for (var i = 0; i < products.length; i++) {
    var opt = document.createElement("option");
    opt.value = products[i].id;
    opt.innerHTML = products[i].name;
    selectBox.appendChild(opt);
  }
}




export default function SaleForm() {
   const router = useRouter()

  var [product, setProduct] = useState("");

  //search for the product once user types in search product
  useEffect(() => {
    api_axios
      .get("/api/products/search", {
        withCredentials: true,
        params: { product_name: product },
      })
      .then((res) => {
        console.log("success in getting products");
        console.log(res.data.products);

        var products = res.data.products;
        changeSelect(products);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, [product]);

  //when product is selected in select input, show table
  var [selectedProductID, setSelectedProductID] = useState(0);

  useEffect(() => {
    if(selectedProductID != 0){

    api_axios
      .get("/api/products/" + selectedProductID, {
        withCredentials: true,
      })
      .then((res) => {
        var selectedProduct = {};
        selectedProduct.quantity = 1
        selectedProduct.number = number
        selectedProduct.product = res.data.product
        
        number++

        
        sale.add_product(selectedProduct);
      })
      .catch((err) => {
        console.log(err);
      });    }

  }, [selectedProductID]);

  useEffect(() => {
    registerEvents()
  }, [])
  function checkTimes(){
    console.log("fired")
  }
 
  return (
    
    <>
    {/* //create the table to hold sale products once the page loads
    //and also register events  */}
    {  }
    {/* // { checkTimes() }  */}
      <script src="/js/sale_add.js" />

      <form className="saleForm">
        <div className="row mt-3">
          <div className="card col-md-12">
            <div className="card-body ml-0">
              <div className="row">
                <div className="col-md-9 pl-0">
                  <div className="card card-secondary">
                    <div className="card-header">Sale products</div>

                    <div className="card-body">
                      <div className="form-group">
                        <label>Search product:</label>
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            id="search_product"
                            placeholder="Search For Product"
                            onChange={(e) => setProduct(e.target.value)}
                          ></input>
                          <select
                            className="form-control select2"
                            name="searchbox_products"
                            id="searchbox_products"
                            aria-placeholder="Search a product"
                            onChange={(e) =>
                              setSelectedProductID(e.target.value)
                            }
                          ></select>
                        </div>
                      </div>
                      {/* <!--End Search product-->

                                <!--Delete all products from sale--> */}
                      <button
                        type="button"
                        className="mb-4 btn btn-danger btn-sm deleteAll"
                      >
                        Delete all products{" "}
                        <i className="ml-1 fas fa-trash-alt fa-xs"></i>
                      </button>
                      {/* <!--End Delete all products from sale-->

                                <!--Products table--> */}
                      <div className="card-body table-responsive p-0">
                        <table
                          className="table table-hover text-nowrap"
                          id="table_products"
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Quantity In Stock</th>
                              <th>Total</th>
                              <th className="text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                      {/* <!--End Products table--> */}
                    </div>
                  </div>
                </div>
                {/* <!--End Left column--> */}

                {/* <!--Righ column--> */}
                <div className="col-md-3 pr-0">
                  <div className="card card-secondary">
                    <div className="card-header">Sale details</div>
                    <div className="card-body">
                      {/* {% csrf_token %} */}
                      <div className="form-group">
                        <div className="form-group mt-4">
                          <label>Subtotal</label>
                          <div className="input-group">
                            <input
                            type="number"
                              name="sub_total"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Tax Inclusive (%)</label>
                          <div className="input-group">
                            <input
                              name="tax_percentage"
                              className="form-control"
                              defaultValue={0}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Tax Amount</label>
                          <div className="input-group">
                            <input
                            type="number"
                              name="tax_amount"
                              className="form-control"
                              required
                              value={0}
                              defaultValue={0}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Grand Total</label>
                          <div className="input-group">
                            <input
                            type="number"
                              name="grand_total"
                              className="form-control"
                              id="grand_total"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Amount payed</label>
                          <div className="input-group">
                            <input
                            type="number"
                              name="amount_payed"
                              className="form-control"
                              id="amount_payed"
                              required
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-success font-weight-bold"
                        >
                          Create sale
                        </button>
                      </div>
                      {/* <!--End card-body--> */}
                    </div>
                    {/* <!--End Right column--> */}
                  </div>
                  {/* <!--End row--> */}
                </div>
                {/* <!--End card-body--> */}
              </div>
            </div>
          </div>
        </div>
        <script></script>
      </form>
    </>
  );
}
