"use client";
 
export default function SaleDetail(sale, details) {

  return (
    <>
    {/* //create the table to hold sale products once the page loads
    //and also register events  */}
    
      

    <form action="{% url 'sales_add' %}" class="saleForm" method="post">
    <div class="row mt-3">
        <div class="card col-md-12">
            <div class="card-body ml-0">
                <div class="row">
                    {/* <!--Left column--> */}
                    <div class="col-md-9 pl-0">
                        <div class="card card-secondary">
                            <div class="card-header">Sale products</div>
                            
                            <div class="card-body">
                                {/* <!--Products table--> */}
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-hover text-nowrap" id="table_products">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                </tr>
                                            </thead>
                                        <tbody>
                                            {/* {% for detail in details %} */}
                                            {details.map((detail, key) => {
                                              return(
<tr>
                                                <td>{key}</td>
                                                <td>{detail.Product.name}</td>
                                                <td>{detail.price}</td>
                                                <td className="text-center">{detail.quantity}</td>
                                                <td>{detail.totalDetail}</td>
                                            </tr>
                                              )
                                            })}
                                            
                                            {/* {% endfor %} */}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <!--End Products table--> */}
                            </div>
                        </div>
                    </div>
                    {/* <!--End Left column--> */}

                    {/* <!--Righ column--> */}
                    <div class="col-md-3 pr-0">
                        <div class="card card-secondary">
                            <div class="card-header">Sale details</div>
                            <div class="card-body">
                               
                                <div class="form-group">
                                    
                                <div class="form-group mt-4">
                                    <label>Subtotal</label>
                                    <div class="input-group">
                                        <input name="sub_total" class="form-control" value={sale.subTotal} readonly/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Tax Inclusive (%)</label>
                                    <div class="input-group">
                                        <input name="tax_percentage" class="form-control" value={sale.taxPercentage} readonly/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Tax Amount</label>
                                    <div class="input-group">
                                        <input name="tax_amount" class="form-control" value={sale.taxAmount} readonly/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Grand Total</label>
                                    <div class="input-group">
                                        <input name="grand_total" class="form-control" value={sale.grandTotal} readonly/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Amount payed</label>
                                    <div class="input-group">
                                        <input name="amount_payed" class="form-control" value={sale.amountPayed} readonly/>
                                    </div>
                                </div>

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
</form>
    </>
  );
}
