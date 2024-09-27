'use client'
import { useEffect, useState } from "react";
import SalesTable from "./sales_table";
import api_axios from "../../../api_axios";
var data = [
  {
    id: 1,
    date_added: "Aug. 6, 2024, 1:50 p.m.",
    grand_total: 5000,
    sum_items: 40,
   
  },
  {
    id: 2,
    date_added: "Aug. 7, 2024, 1:50 p.m.",
    grand_total: 5000,
    sum_items: 30,
   
  },
];


function Sales() {
  var [sales, setSales] = useState([])
  
  useEffect(() => {
    api_axios.get(
      "/api/sales",  {withCredentials: true }
    ).then((res) => {
      if (res.data.sales != null) {
        setSales(res.data.sales)
      }
      
      console.log(sales)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div>
     
      
      <link
        href="/vendor/datatables/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      />
      <link href="css/pagination_buttons.css" rel="stylesheet" />

      <div className="row ml-0 mb-3">
        <a href="/sales/add">
          <button type="button" className="btn btn-success font-weight-bold">
            <i className="fas fa-plus mr-2"></i>
            Create New Sale
          </button>
        </a>
      </div>
 
      <div className="card shadow mb-12">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Sales</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {/* table goes here */}
             {SalesTable(sales)} 
            
          </div>
        </div>
      </div>

      <script src="/vendor/datatables/jquery.dataTables.min.js"></script>
      <script src="/vendor/datatables/dataTables.bootstrap4.min.js"></script>

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

export default Sales;
