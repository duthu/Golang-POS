'use client'
import { useEffect, useState } from "react"
import api_axios from "../../../api_axios"
import Link from "next/link";
function SalesTable(data) {
  
  return (
    <div>
      
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th  style={{width: '5%'}}>#</th>
                  <th style={{width: '15%'}}>ID</th>
                  <th style={{width: '25%'}} >Date</th>
                  
                  <th style={{width: '10%'}} className="text-center">
                    Total
                  </th>
                  <th className="text-center" style={{width: '5%'}}>
                    Items
                  </th>
                  <th className="text-center"style={{width: '10%'}}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                 
                { data.map((sale, key) => {
                  var saleUrl = "/sales/" + sale.SaleParent.id
                    return(
                  <tr>
                    <td>{key}</td>
                    <td>{sale.SaleParent.id}</td>
                    <td>{sale.SaleParent.DateAdded}</td>
                    
                    <td className="text-right">{sale.SaleParent.grandTotal}</td>
                    <td className="text-center">{sale.items}</td>
                    <td className="text-center">
                      <Link href={saleUrl}><button
                          type="button"
                          className="btn btn-info btn-sm"
                          data-bs-toggle="tooltip"
                          title="Update sale"
                        >
                          <i className="fas fa-eye"></i>
                        </button> </Link>
                        
                      

                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
          
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

export default SalesTable