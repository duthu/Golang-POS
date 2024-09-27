"use client"
import api_axios from "../../../api_axios";
import server_axios from "../../../server_axios";
import { useEffect, useState } from "react";
import Table from "./table"

import validateCreds from "../validateCreds";

function Categories() {
  validateCreds()
  
  var [categories, setCategories] = useState([])
  
  useEffect(() => {
    api_axios.get(
      "/api/categories", {
          
          withCredentials: true,
      }
  ).then( (res) => {
      console.log("success in getting categories")
      
      categories = res.data.categories
      setCategories(res.data.categories)
      
  }   
  ).catch((err) => {
      console.log("error in fetching from api")
      throw err
      //console.log(err)
  })
  }, []) 


  console.log("categories list: " + categories)
  
 
  return (
    <div>
     
      
      <link
        href="vendor/datatables/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      />
      <link href="css/pagination_buttons.css" rel="stylesheet" />

      <div className="row ml-0 mb-3">
        <a href="/categories/add">
          <button type="button" className="btn btn-success font-weight-bold">
            <i className="fas fa-plus mr-2"></i>
            Create new category
          </button>
        </a>
      </div>
 
      <div className="card shadow mb-12">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Categories</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {/* table goes here */}
             {/* {Table({data})} */}
              { Table(categories) }
            
          </div>
        </div>
      </div>

      <script src="vendor/datatables/jquery.dataTables.min.js"></script>
      <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.datatables.net/buttons/2.3.3/js/dataTables.buttons.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.datatables.net/buttons/2.3.3/js/buttons.colVis.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.datatables.net/buttons/2.3.3/js/buttons.html5.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.datatables.net/buttons/2.3.3/js/buttons.print.min.js"
      ></script>

      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"
      ></script>
    </div>
  );
}

export default Categories;
