"use client";
import { useEffect } from "react";


function Dashboard(props) {
 
  return (
    <div>
      <div className="row">      

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Registered Products
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {props.products}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-fw fa-tag fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Registered Categories
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {props.categories}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-fw fa-tag fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <script src="vendor/chart.js/Chart.min.js"></script>

      <input
        type="hidden"
        id="monthly_earnings"
        value={props.monthly_earnings}
      />

      <input
        type="hidden"
        id="top_products_names"
        value={props.top_products_names}
      />

      <input
        type="hidden"
        id="top_products_quantity"
        value={props.top_products_quantity}
      />
      <script></script>

      <script src="js/chart-pie.js"></script>
    </div>
  );
}
export default Dashboard;

//<script src="js/chart-area.js"></script>
