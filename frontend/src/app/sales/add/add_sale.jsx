'use client'
import { useEffect } from 'react';
import SaleForm from './add_sale_form'




export default function AddSale() {

  

  return (
    <>
    <script
  src="https://code.jquery.com/jquery-3.7.1.min.js"
  integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
  crossorigin="anonymous"></script>
    
      <link
        href="/vendor/datatables/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      />

      <link
        href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@ttskch/select2-bootstrap4-theme@1.5.2/dist/select2-bootstrap4.min.css"
      />

      <link
        rel="stylesheet"
        href="/assets/bootstrap-touchspin-master/src/jquery.bootstrap-touchspin.css"
      />

      <h2 id='msgError' style={{color: "red"}}></h2>
      <div className="row ml-0 mb-3">
        <a href="/sales">
          <button type="button" className="btn btn-info font-weight-bold">
            <i className="fas fa-long-arrow-alt-left mr-2"></i>
            Go back
          </button>
        </a>
      </div>

      {/* Form goes here */}

        { SaleForm() }
      {/* end form */}

      <script src="/vendor/datatables/jquery.dataTables.min.js"></script>
      <script src="/vendor/datatables/dataTables.bootstrap4.min.js"></script>
      {/* <!--Select2--> */}

      <script
        src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
        defer
      ></script>
      {/* <!--Bootstrap Touchspin--> */}
      <script src="/assets/bootstrap-touchspin-master/src/jquery.bootstrap-touchspin.js"></script>
      {/* <!--Sweet Alert--> */}
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.6.15/dist/sweetalert2.all.min.js"></script>

      <script src="/js/sale_add.js"  />
      
    </>
  );
}
