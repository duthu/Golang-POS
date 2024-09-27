"use client";
import DataTable from "datatables.net-dt";
import $ from "jquery";

import Swal from "sweetalert2";

// Source: https://stackoverflow.com/a/32605063
export function roundTo(n, digits) {
  if (digits === undefined) {
    digits = 0;
  }

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
}
export var tblProducts;


export const sale = {
  items: {
    customer: 0,
    sub_total: 0.0,
    grand_total: 0.0,
    tax_amount: 0.0,
    tax_percentage: 0.0,
    amount_payed: 0.0,
    amount_change: 0.0,
    products: [],
  },
  calculate_sale: function () {
    // Subtotal of all products added
    var sub_total = 0.0;

    var tax_percentage = $('input[name="tax_percentage"]').val();

    // Calculates the total for each product
    $.each(this.items.products, function (pos, dict) {
      
      dict.pos = pos;
      dict.total_product = roundTo(dict.quantity * dict.product.price, 2);
      // Add the product total to the sale subtotal
      sub_total += roundTo(dict.total_product, 2);
    });

    //Update the sale subtotal, grand total, and tax amount
    this.items.sub_total = roundTo(sub_total, 2);
    
    this.items.tax_amount = roundTo(
      this.items.sub_total * (tax_percentage / 100),
      2
    );
    this.items.grand_total = roundTo(this.items.sub_total + this.items.tax_amount, 2);
    $('input[name="sub_total"]').val(this.items.sub_total);
    $('input[name="tax_amount"]').val(this.items.tax_amount);
    $('input[name="grand_total"]').val(this.items.grand_total);
  },
  // Adds a product to the sale object
  add_product: function (item) {
    this.items.products.push(item);
    this.list_product();
  },
  // Shows the selected product in the table
  list_product: function () {
    // Calculate the sale
    this.calculate_sale();

    tblProducts = $("#table_products").DataTable({
      destroy: true,
      data: this.items.products,
      columns: [
        { data: "number" },
        { data: "product.name" },
        { data: "product.price" },
        { data: "product.quantity" },
        { data: "product.quantityInStock" },
        { data: "total_product" },
        { data: "product.id" },
      ],
      columnDefs: [
        {
          // Quantity
          class: "text-center",
          targets: [3],
          render: function (data, type, row) {
            return (
              '<input name="quantity" type="text" class="form-control form-control-xs text-center input-sm" autocomplete="off" value="' +
              row.quantity +
              '">'
            );
          },
        },
        {
          //Product price an total
          class: "text-right",
          targets: [2, 5],
          render: function (data, type, row) {
            return parseFloat(data).toFixed(2) + " KSh";
          },
        },
        {
          //Delete button
          class: "text-center",
          targets: [-1],
          orderable: false,
          render: function (data, type, row) {
            return '<a rel="delete" type="button" class="btn btn-sm btn-danger" data-bs-toggle="tooltip" title="Delete product"> <i class="fas fa-trash-alt fa-xs"></i> </a>';
          },
        },
      ],
      rowCallback(row, data, displayNun, displayIndex, dataIndex) {
        
        $(row).find("input[name='quantity']").TouchSpin({
          min: 1,
          max: data.product.quantityInStock, //Máximo de acuerdo al stock de cada producto
          step: 1,
          decimals: 0,
          boostat: 1,
          maxboostedstep: 3,
          postfix: "",
        });
      },
    });

  },
};


